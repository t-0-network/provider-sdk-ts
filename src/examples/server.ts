/**
  Example on how to implement network notifications with SDK
*/

import {createService} from "../index";
import {
  AppendLedgerEntriesResponse,
  PayoutResponse, UpdateLimitResponse,
  UpdatePaymentResponse
} from "common/gen/network/provider_pb";
import {
  PayoutRequest,
  UpdatePaymentRequest,
  UpdateLimitRequest,
  AppendLedgerEntriesRequest,
} from "common/gen/network/provider_pb";
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

async function main() {
  dotenv.config();
  const networkPublicKeyHex = process.env.TZERO_PUBLIC_KEY!;

  const server = http.createServer(
    signatureValidation(
      nodeAdapter(
        createService(networkPublicKeyHex, CreateProviderService())))
  ).listen(8080);
  console.log("server is listening at", server.address());
}

void main();

