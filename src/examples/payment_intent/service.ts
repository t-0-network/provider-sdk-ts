/**
 Example on how to implement network notifications with SDK
 */

import {ProviderService} from "../../payment_intent/provider";
import {
    ConfirmPayoutRequest, ConfirmPayoutResponse,
    CreatePaymentIntentRequest,
    CreatePaymentIntentResponse
} from "common/gen/payment_intent/provider/provider_pb";
import {HandlerContext} from "@connectrpc/connect";
import * as http from "http";
import {createService, nodeAdapter} from "../../index";
import {signatureValidation} from "../../index";
import dotenv from "dotenv";

/*
  Providers must implement this. Please refer to docs or proto definition comments
 */
const CreatePaymentIntentProviderService = () => {
    return {
        async createPaymentIntent(req: CreatePaymentIntentRequest, context: HandlerContext) {
            // Implement your logic to create a payment intent
            return {} as CreatePaymentIntentResponse;
        },

        async confirmPayout(req: ConfirmPayoutRequest, context: HandlerContext) {
            // Implement your logic to confirm a payout
            return {} as ConfirmPayoutResponse;
        }
    }
};

async function main() {
    dotenv.config();
    const networkPublicKeyHex = process.env.TZERO_PUBLIC_KEY!;

    const server = http.createServer(
        signatureValidation(
            nodeAdapter(
              createService(networkPublicKeyHex, r =>
                r.service(ProviderService, CreatePaymentIntentProviderService())
              )))
    ).listen(8080);
    console.log("server is listening at", server.address());
}

void main();

