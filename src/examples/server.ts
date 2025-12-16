/**
  Example on how to implement network notifications with SDK
*/

import {
  ApprovePaymentQuoteRequest,
  ApprovePaymentQuoteRequestSchema, ApprovePaymentQuoteResponse,
  createService,
  ProviderService
} from "../index.js";
import {
  PayoutRequest,
  PayoutResponse,
  UpdatePaymentRequest,
  UpdateLimitRequest,
  UpdateLimitResponse,
  AppendLedgerEntriesRequest,
  AppendLedgerEntriesResponse,
  UpdatePaymentResponse
} from "../index.js";
import {
  ConfirmPayoutRequest,
  ConfirmPayoutResponse,
  CreatePaymentIntentRequest,
  CreatePaymentIntentResponse,
  ProviderService as PaymentIntentProviderService
} from "../payment_intent/provider/index.js";
import {HandlerContext} from "@connectrpc/connect";
import * as http from "http";
import { nodeAdapter } from "../index.js";
import {signatureValidation} from "../index.js";
import dotenv from "dotenv";

/*
  Providers must implement this. Please refer to docs or proto definition comments
 */
const CreateProviderService = ()=> {
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

    async approvePaymentQuotes(req: ApprovePaymentQuoteRequest, context: HandlerContext) {
      return {
      } as ApprovePaymentQuoteResponse
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