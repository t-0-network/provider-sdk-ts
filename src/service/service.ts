import {
  Code,
  ConnectError,
  ConnectRouter,
  createContextKey,
  createContextValues,
  StreamRequest,
  UnaryRequest
} from "@connectrpc/connect";
import { ProviderService } from "../common/gen/network/provider_pb";
import { ProviderService as PaymentIntentProviderService } from "../common/gen/payment_intent/provider/provider_pb"
import type {ServiceImpl} from "@connectrpc/connect/dist/esm/implementation";
import type { Interceptor } from "@connectrpc/connect";
import NetworkHeaders from "../common/headers";
import {NodeServerRequest} from "@connectrpc/connect-node/dist/esm/node-universal-handler";
import * as secp from '@noble/secp256k1'
import {Hash} from "@noble/hashes/utils";

export const REQUEST_VALIDITY_MILLIS = 60_000;

const createRoutes = (service: ServiceImpl<typeof ProviderService>) => (router: ConnectRouter) => {
  router.service(ProviderService, service);
}

const createPaymentIntentRoutes = (service: ServiceImpl<typeof PaymentIntentProviderService>) => (router: ConnectRouter) => {
    router.service(ProviderService, service);
}

const createSignatureVerification: (networkPublicKey: Buffer) => Interceptor = (networkPublicKey: Buffer) => (next) => async (req) => {
  const ts = decodeNum(getHeader(req, NetworkHeaders.SignatureTimestamp));
  if (Date.now() - ts > 60_000) {
    throw new ConnectError(`${NetworkHeaders.SignatureTimestamp} must be within ${REQUEST_VALIDITY_MILLIS} milliseconds from now` , Code.InvalidArgument);
  }

  const publicKey = decodeHex(getHeader(req, NetworkHeaders.PublicKey))
  if (networkPublicKey.compare(publicKey) !== 0 ) {
    throw new ConnectError(`${NetworkHeaders.PublicKey} value is not network public key`, Code.Unauthenticated);
  }

  const signature = decodeHex(getHeader(req, NetworkHeaders.Signature))

  const hasher = req.contextValues.get(kHash)!;

  const tsBuf = Buffer.alloc(8);
  tsBuf.writeBigUInt64LE(BigInt(ts)); // 64‑bit little‑endian timestamp

  const hash = hasher
    .update(tsBuf)
    .digest();
  let signatureValid = false;
  try {
    signatureValid = secp.verify(signature, hash, publicKey);
  } catch (e) {
    throw new ConnectError(`${NetworkHeaders.Signature} has invalid signature or public key format` , Code.Unauthenticated);
  }

  if (!signatureValid) {
    throw new ConnectError(`${NetworkHeaders.Signature} has invalid signature` , Code.Unauthenticated);
  }
  return await next(req);
};

export const createService = (networkPublicKey: string | Buffer, service: ServiceImpl<typeof ProviderService>) => {
  if (typeof networkPublicKey == "string") {
    networkPublicKey = decodeHex(networkPublicKey)
  }

  return {
    routes: createRoutes(service),
    interceptors: [createSignatureVerification(networkPublicKey)],
    grpcWeb: false,
    contextValues: (req: NodeServerRequest) => {
      return createContextValues().set(kHash, (req as any).hasher as Hash<Hash<any>>)
    }
  }
}

const kHash = createContextKey<Hash<Hash<any>>| undefined>(undefined);



function getHeader(req: UnaryRequest | StreamRequest, header: NetworkHeaders) {
  const raw = req.header.get(header);
  if (!raw) {
    throw new ConnectError(`missing required header '${header}'`, Code.InvalidArgument);
  }
  return raw;
}

function decodeHex(value: string) {
  value = value.startsWith('0x') ? value.slice(2) : value;
  try {
    return Buffer.from(value, "hex");
  } catch (e) {
    throw new ConnectError(`invalid header format. '${value}' must be hex encoded`, Code.InvalidArgument);
  }
}

function decodeNum(value: string) {
  try {
    return parseInt(value);
  } catch (e) {
    throw new ConnectError(`invalid header format. '${value}' must be a number`, Code.InvalidArgument);
  }
}