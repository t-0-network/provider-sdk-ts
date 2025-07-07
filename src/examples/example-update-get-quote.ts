import createNetworkClient from "../network_client";
import dotenv from 'dotenv';
import MessageSigner from "./message-signer";
import {create} from "@bufbuild/protobuf";
import {Decimal, DecimalSchema} from "../gen/common/common_pb";
import {randomUUID} from "node:crypto";
import {QuoteType} from "../gen/network/network_pb";
import {timestampFromDate, timestampNow} from "@bufbuild/protobuf/wkt";

dotenv.config();

const defaultBaseUrl = 'https://api.t-0.network';
const tzeroEndpoint = process.env.TZERO_ENDPOINT || defaultBaseUrl;

const privateKeyHex = process.env.PRIVATE_KEY;

if (!privateKeyHex) {
    throw new Error('PRIVATE_KEY not found in environment variables');
}

const signer = new MessageSigner(privateKeyHex);

const networkClient = createNetworkClient(tzeroEndpoint, signer.signHash);

const toProtoDecimal = (unscaled: number, exponent: number): Decimal => {
    return create(DecimalSchema, {
        unscaled: BigInt(unscaled),
        exponent: exponent,
    });
}

try {
    // Update the quote
    const updateResponse = await networkClient.updateQuote({
        payIn: [{
            bands: [{
                rate: toProtoDecimal(123, 2), // Example rate
                maxAmount: toProtoDecimal(1000, 0), // Example maximum amount
                clientQuoteId: randomUUID(),
            }],
            currency: 'USD', // Example currency
            expiration: timestampFromDate(new Date(Date.now() + 60 * 1000)), // Example expiration time (1 minute from now)
            quoteType: QuoteType.REALTIME, // Example quote type
            timestamp: timestampNow(), // Current timestamp
        }]
    })

    console.log('Update Quote Response:', updateResponse);

    // Get the updated quote
    const payoutQuote = await networkClient.getPayoutQuote({
        quoteType: QuoteType.REALTIME,
        amount: toProtoDecimal(1000, 0),
        payoutCurrency: 'EUR', // Example payout currency
    });

    console.log('Get Quote Response:', payoutQuote);
} catch (error) {
    console.error('Error updating or getting quote:', error);
}




