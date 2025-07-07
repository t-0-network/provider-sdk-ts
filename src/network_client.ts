/**
 **/

import {createClient} from "@connectrpc/connect";
import {createConnectTransport} from "@connectrpc/connect-web";
import {keccak_256} from "@noble/hashes/sha3";

import {NetworkService} from "./gen/network/network_pb";

export default function createNetworkClient(endpoint: string, signer: SignerFunction) {
    let customFetch: typeof global.fetch;

    customFetch = async (r, init) => {
        if (!(init?.body instanceof Uint8Array)) {
            throw "unsupported body type";
        }

        const ts = Date.now();
        // 64‑bit little‑endian timestamp
        const tsBuf = Buffer.alloc(8);
        tsBuf.writeBigInt64LE(BigInt(ts));

        const msgBuf = Buffer.concat([tsBuf, Buffer.from(init.body)]);
        const hash = keccak_256(msgBuf);
        const hashHex = Buffer.from(hash).toString("hex");

        const sig = signer(hashHex);

        const headers = new Headers(init?.headers);
        headers.append("X-Signature", sig.signature);
        headers.append("X-Public-Key", sig.publicKey);
        headers.append("X-Signature-Timestamp", ts.toString());

        const modifiedInit: RequestInit = {...init, headers};
        return fetch(r, modifiedInit)
    };

    const transport = createConnectTransport({
        baseUrl: endpoint,
        fetch: customFetch,
    });

    return createClient(NetworkService, transport);
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
export type SignerFunction = (data: string) => Signature;
