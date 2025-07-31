import {Client, createClient as createConnectClient} from "@connectrpc/connect";
import {createConnectTransport} from "@connectrpc/connect-web";
import {keccak_256} from "@noble/hashes/sha3";
import CreateSigner from "./signer";
import NetworkHeaders from "../common/headers";
import {DescService} from "@bufbuild/protobuf";

export const DEFAULT_ENDPOINT = "https://api.t-0.network"

export function createClient<T extends DescService>(signer: string | Buffer | ((data: Buffer) => Promise<Signature>) | Buffer<ArrayBufferLike>, endpoint: string | undefined, svc: T) {
    let customFetch: typeof global.fetch;

    endpoint = endpoint || DEFAULT_ENDPOINT;

    if (typeof signer === "string" || Buffer.isBuffer(signer)) {
        signer = CreateSigner(signer);
    }

    customFetch = async (r, init) => {
        if (!init?.body || !((init.body) instanceof Uint8Array)) {
            throw "unsupported body type";
        }

        const ts = Date.now();
        // 64‑bit little‑endian timestamp
        const tsBuf = Buffer.alloc(8);
        tsBuf.writeBigUInt64LE(BigInt(ts));

        const hash = keccak_256.create()
            .update(init.body)
            .update(tsBuf);
        const hashHex = Buffer.from(hash.digest())

        const sig = await signer(hashHex);

        const headers = new Headers(init?.headers);
        headers.append(NetworkHeaders.Signature, "0x" + sig.signature.toString('hex'));
        headers.append(NetworkHeaders.PublicKey, "0x" + sig.publicKey.toString('hex'));
        headers.append(NetworkHeaders.SignatureTimestamp, ts.toString());

        const modifiedInit: RequestInit = {...init, headers};
        return fetch(r, modifiedInit)
    };

    const transport = createConnectTransport({
        baseUrl: endpoint || DEFAULT_ENDPOINT,
        fetch: customFetch,
    });

    return createConnectClient(svc, transport);
}

/**
 * Signature with metadata for particular request
 */
export interface Signature {
    //hex encoded signature
    signature: Buffer;
    // hex encoded public key
    publicKey: Buffer;
}

/**
 * Signature function for signing requests to T-0 API. Accepts any data in string format and return signature
 * with metadata
 */
export type SignerFunction = (data: Buffer) => Promise<Signature>;

export default createClient;
