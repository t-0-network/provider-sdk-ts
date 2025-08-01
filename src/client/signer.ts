import * as secp from '@noble/secp256k1'
import {Signature} from "./client.js";

export const CreateSigner = (privateKey: string | Buffer)=> {
    privateKey = parsePrivateKey(privateKey)
    const publicKey = Buffer.from(secp.getPublicKey(privateKey, false));

    return async (data: Buffer): Promise<Signature> => {
        // Ensure hash is 32 bytes
        if (data.length !== 32) {
            throw new Error('Message hash must be 32 bytes');
        }

        // Sign the hash
        const signature = await secp.signAsync(data, privateKey);

        return {
            signature: Buffer.from(signature.toBytes()),
            publicKey: publicKey,
        };
    }
}

const parsePrivateKey = (privateKey: string | Buffer) => {
    if (typeof privateKey == 'string'){
        privateKey = privateKey.replace(/^0x/, '');
        if (!/^[0-9a-fA-F]{64}$/.test(privateKey)) {
            throw new Error('Private key must be 64 hex characters');
        }

        privateKey = Buffer.from(privateKey, 'hex');
    }

    // Validate private key
    if (!secp.utils.isValidPrivateKey(privateKey)) {
        throw new Error('Invalid private key');
    }

    return privateKey
}

export default CreateSigner;