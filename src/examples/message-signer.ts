import {utils, sign, getPublicKey} from '@noble/secp256k1'
import {createHash} from 'crypto';
import {Signature} from "../network_client";

export class MessageSigner {
    private readonly privateKey: Buffer;

    constructor(privateKeyHex: string) {
        this.privateKey = this.parsePrivateKey(privateKeyHex);

    }

    private parsePrivateKey(privateKeyHex: string): Buffer {
        // Remove 0x prefix if present
        const cleanHex = privateKeyHex.replace(/^0x/, '');

        // Validate hex format
        if (!/^[0-9a-fA-F]{64}$/.test(cleanHex)) {
            throw new Error('Private key must be 64 hex characters');
        }

        // Convert hex to Buffer
        const privateKeyBuffer = Buffer.from(cleanHex, 'hex');

        // Validate private key
        if (!utils.isValidPrivateKey(privateKeyBuffer)) {
            throw new Error('Invalid private key');
        }

        return privateKeyBuffer;
    }

    // Sign a message hash
    signHash = (messageHash: string | Buffer): Signature =>{
        let hashBuffer: Buffer;

        if (typeof messageHash === 'string') {
            // Remove 0x prefix if present and convert to Buffer
            hashBuffer = Buffer.from(messageHash.replace(/^0x/, ''), 'hex');
        } else {
            hashBuffer = messageHash;
        }

        // Ensure hash is 32 bytes
        if (hashBuffer.length !== 32) {
            throw new Error('Message hash must be 32 bytes');
        }

        // Sign the hash
        const signature = sign(hashBuffer, this.privateKey);

        return {
            signature: signature.toBytes().toString(),
            publicKey: this.getPublicKey(),
        };
    }

    // Sign a message (will hash it first)
    signMessage = (message: string | Buffer): Signature => {
        // Hash the message using SHA-256
        const messageHash = createHash('sha256').update(message).digest();
        return this.signHash(messageHash);
    }

    // Get public key from private key
    getPublicKey = (): string => {
        const publicKey = getPublicKey(this.privateKey);
        return Buffer.from(publicKey).toString('hex');
    }

    // Get compressed public key
    getCompressedPublicKey = (): string => {
        const publicKey = getPublicKey(this.privateKey, true);
        return Buffer.from(publicKey).toString('hex');
    }
}

export default MessageSigner;