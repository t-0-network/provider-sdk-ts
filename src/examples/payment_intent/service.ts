/**
 Example on how to implement network notifications with SDK
 */
import {
    ProviderService,
    ConfirmPayoutRequest,
    ConfirmPayoutResponse,
    CreatePaymentIntentRequest,
    CreatePaymentIntentResponse
} from "../../payment_intent/provider/index.js";
import {HandlerContext} from "@connectrpc/connect";
import * as http from "http";
import {createService, nodeAdapter} from "../../index.js";
import {signatureValidation} from "../../index.js";
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

