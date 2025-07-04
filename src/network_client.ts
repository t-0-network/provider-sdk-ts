/**
 **/

import {createClient, Client} from "@connectrpc/connect";
import {createConnectTransport} from "@connectrpc/connect-web";
import {keccak_256} from "@noble/hashes/sha3";

import {
    CreatePayInRequest, CreatePayInResponse,
    CreatePaymentRequest, CreatePaymentResponse, GetKycDataRequest, GetKycDataResponse,
    GetPayoutQuoteRequest,
    GetPayoutQuoteResponse,
    NetworkService, UpdatePayoutRequest, UpdatePayoutResponse,
    UpdateQuoteRequest,
    UpdateQuoteResponse
} from "./gen/network/network_pb";
import {} from "./gen/network/provider_pb"

export default class NetworkClient {
    public client: Client<typeof NetworkService>;

    constructor(endpoint: string, signer: SignerFunction) {
        let customFetch: typeof global.fetch;

        customFetch = async (r, init) => {
            if (!(init?.body instanceof Uint8Array)) {
                throw "unsupported body type";
            }
            const bodyText = new TextDecoder().decode(init.body);

            const ts = Date.now();
            // 64‑bit little‑endian timestamp
            const tsBuf = Buffer.alloc(8);
            tsBuf.writeBigInt64LE(BigInt(ts));

            const msgBuf = Buffer.concat([tsBuf, Buffer.from(bodyText)]);
            const hash = keccak_256(msgBuf);
            const hashHex = Buffer.from(hash).toString("hex");

            const sig = await signer(hashHex);

            const headers = new Headers(init?.headers);
            headers.append("X-Signature", sig.signature);
            headers.append("X-PublicKey", sig.publicKey);
            headers.append("X-Signature-Timestamp", ts.toString());

            const modifiedInit: RequestInit = {...init, headers};
            return fetch(r, modifiedInit)
        };

        const transport = createConnectTransport({
            baseUrl: endpoint,
            fetch: customFetch,
        });

        this.client = createClient(NetworkService, transport);
    }

    public async updateQuote(
        request: UpdateQuoteRequest,
    ): Promise<UpdateQuoteResponse> {
        return this.client.updateQuote(request);
    }

    public async getPayoutQuote(
        request: GetPayoutQuoteRequest,
    ): Promise<GetPayoutQuoteResponse> {
        return this.client.getPayoutQuote(request);
    }

    public async createPayment(
        request: CreatePaymentRequest,
    ): Promise<CreatePaymentResponse> {
        return this.client.createPayment(request);
    }

    public async createPayIn(
        request: CreatePayInRequest,
    ): Promise<CreatePayInResponse> {
        return this.client.createPayIn(request);
    }

    public async updatePayout(
        request: UpdatePayoutRequest,
    ): Promise<UpdatePayoutResponse> {
        return this.client.updatePayout(request);
    }

    public async getKycData(
        request: GetKycDataRequest,
    ): Promise<GetKycDataResponse> {
        return this.client.getKycData(request);
    }

}

/**
 * Signature with metadata for particular request
 */
export interface Signature {
    //hex encoded signature
    signature: string;
    // hex encoded public key
    publicKey: string;
}

/**
 * Signature function for signing requests to T-0 API. Accepts any data in string format and return signature
 * with metadata
 */
export type SignerFunction = (data: string) => Promise<Signature>;
