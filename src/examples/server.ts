/**
  Example on how to implement network notifications with SDK
*/

import {createService, ProviderService} from "../index";
import {
  PayoutRequest,
  PayoutResponse,
  UpdatePaymentRequest,
  UpdateLimitRequest,
  UpdateLimitResponse,
  AppendLedgerEntriesRequest,
  AppendLedgerEntriesResponse,
  UpdatePaymentResponse
} from "../";
import {
  ConfirmPayoutRequest,
  ConfirmPayoutResponse,
  CreatePaymentIntentRequest,
  CreatePaymentIntentResponse,
  ProviderService as PaymentIntentProviderService
} from "../payment_intent/provider";
import {HandlerContext} from "@connectrpc/connect";
import * as http from "http";
import { nodeAdapter } from "../index";
import {signatureValidation} from "../index";
import dotenv from "dotenv";

/*
  Providers must implement this. Please refer to docs or proto definition comments
 */
const CreateProviderService = () => {
  return {
    async payOut(req: PayoutRequest, context: HandlerContext) {

      return {} as PayoutResponse
    },

    async updatePayment(req: UpdatePaymentRequest, context: HandlerContext) {
      return {} as UpdatePaymentResponse
    },


    async updateLimit(req: UpdateLimitRequest, context: HandlerContext) {
      return {} as UpdateLimitResponse
    },

    async appendLedgerEntries(req: AppendLedgerEntriesRequest, context: HandlerContext) {
      return {
      } as AppendLedgerEntriesResponse
    },
  }
};

/*
  Providers must implement this. Please refer to docs or proto definition comments
 */
const CreatePaymentIntentProviderService = () => {
  return {
    async createPaymentIntent(req: CreatePaymentIntentRequest, context: HandlerContext) {
      console.log(`${req.$typeName}`);
      // Implement your logic to create a payment intent
      return {} as CreatePaymentIntentResponse;
    },

    async confirmPayout(req: ConfirmPayoutRequest, context: HandlerContext) {
      console.log(`${req.$typeName}`);
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
        createService(networkPublicKeyHex, (r) => {
          r.service(ProviderService, CreateProviderService());
          r.service(PaymentIntentProviderService, CreatePaymentIntentProviderService());
        })))
  ).listen(8080);
  console.log("server is listening at", server.address());
}

void main();