/**
  Example on how to interact with network using SDK
*/

import createNetworkClient, {DEFAULT_ENDPOINT} from "client/client";
import dotenv from 'dotenv';
import {create} from "@bufbuild/protobuf";
import {Decimal, DecimalSchema} from "common/gen/common/common_pb";
import {randomUUID} from "node:crypto";
import {QuoteType} from "common/gen/network/network_pb";
import {timestampFromDate, timestampNow} from "@bufbuild/protobuf/wkt";

async function main() {
    dotenv.config();
    const privateKeyHex = process.env.PROVIDER_PRIVATE_KEY!;
    const endpoint = process.env.TZERO_ENDPOINT || DEFAULT_ENDPOINT;

    const networkClient = createNetworkClient(privateKeyHex, endpoint);

    const toProtoDecimal = (unscaled: number, exponent: number): Decimal => {
        return create(DecimalSchema, {
            unscaled: BigInt(unscaled),
            exponent: exponent,
        });
    }

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
}

void main();



