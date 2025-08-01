// @generated by protoc-gen-es v2.6.2 with parameter "target=ts,import_extension=js"
// @generated from file tzero/v1/payment_intent/recipient/recipient.proto (package tzero.v1.payment_intent.recipient, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv2";
import { fileDesc, messageDesc, serviceDesc } from "@bufbuild/protobuf/codegenv2";
import type { Decimal } from "../../common/common_pb.js";
import { file_tzero_v1_common_common } from "../../common/common_pb.js";
import type { PaymentMethod, PaymentMethodType } from "../../common/payment_method_pb.js";
import { file_tzero_v1_common_payment_method } from "../../common/payment_method_pb.js";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file tzero/v1/payment_intent/recipient/recipient.proto.
 */
export const file_tzero_v1_payment_intent_recipient_recipient: GenFile = /*@__PURE__*/
  fileDesc("CjF0emVyby92MS9wYXltZW50X2ludGVudC9yZWNpcGllbnQvcmVjaXBpZW50LnByb3RvEiF0emVyby52MS5wYXltZW50X2ludGVudC5yZWNpcGllbnQi0wEKGkNyZWF0ZVBheW1lbnRJbnRlbnRSZXF1ZXN0EhkKEXBheW1lbnRfcmVmZXJlbmNlGAogASgJEhcKD3BheV9pbl9jdXJyZW5jeRgUIAEoCRIvCg1wYXlfaW5fYW1vdW50GB4gASgLMhgudHplcm8udjEuY29tbW9uLkRlY2ltYWwSGAoQcGF5X291dF9jdXJyZW5jeRgoIAEoCRI2Cg5wYXlfb3V0X21ldGhvZBgyIAEoCzIeLnR6ZXJvLnYxLmNvbW1vbi5QYXltZW50TWV0aG9kIp0CChtDcmVhdGVQYXltZW50SW50ZW50UmVzcG9uc2USGQoRcGF5bWVudF9pbnRlbnRfaWQYCiABKAQSbAoWcGF5X2luX3BheW1lbnRfbWV0aG9kcxgUIAMoCzJMLnR6ZXJvLnYxLnBheW1lbnRfaW50ZW50LnJlY2lwaWVudC5DcmVhdGVQYXltZW50SW50ZW50UmVzcG9uc2UuUGF5bWVudE1ldGhvZBp1Cg1QYXltZW50TWV0aG9kEhMKC3BheW1lbnRfdXJsGAogASgJEhMKC3Byb3ZpZGVyX2lkGBQgASgNEjoKDnBheW1lbnRfbWV0aG9kGB4gASgOMiIudHplcm8udjEuY29tbW9uLlBheW1lbnRNZXRob2RUeXBlIokBChVDb25maXJtUGF5bWVudFJlcXVlc3QSGQoRcGF5bWVudF9pbnRlbnRfaWQYCiABKAQSGQoRcGF5bWVudF9yZWZlcmVuY2UYFCABKAkSOgoOcGF5bWVudF9tZXRob2QYHiABKA4yIi50emVyby52MS5jb21tb24uUGF5bWVudE1ldGhvZFR5cGUiHgocQ29uZmlybVBheW1lbnRJbnRlbnRSZXNwb25zZSJiChpSZWplY3RQYXltZW50SW50ZW50UmVxdWVzdBIZChFwYXltZW50X2ludGVudF9pZBgKIAEoBBIZChFwYXltZW50X3JlZmVyZW5jZRgUIAEoCRIOCgZyZWFzb24YHiABKAkiHQobUmVqZWN0UGF5bWVudEludGVudFJlc3BvbnNlMqwBCg5OZXR3b3JrU2VydmljZRKZAQoTQ3JlYXRlUGF5bWVudEludGVudBI9LnR6ZXJvLnYxLnBheW1lbnRfaW50ZW50LnJlY2lwaWVudC5DcmVhdGVQYXltZW50SW50ZW50UmVxdWVzdBo+LnR6ZXJvLnYxLnBheW1lbnRfaW50ZW50LnJlY2lwaWVudC5DcmVhdGVQYXltZW50SW50ZW50UmVzcG9uc2UiA5ACAjLBAgoQUmVjaXBpZW50U2VydmljZRKQAQoOQ29uZmlybVBheW1lbnQSOC50emVyby52MS5wYXltZW50X2ludGVudC5yZWNpcGllbnQuQ29uZmlybVBheW1lbnRSZXF1ZXN0Gj8udHplcm8udjEucGF5bWVudF9pbnRlbnQucmVjaXBpZW50LkNvbmZpcm1QYXltZW50SW50ZW50UmVzcG9uc2UiA5ACAhKZAQoTUmVqZWN0UGF5bWVudEludGVudBI9LnR6ZXJvLnYxLnBheW1lbnRfaW50ZW50LnJlY2lwaWVudC5SZWplY3RQYXltZW50SW50ZW50UmVxdWVzdBo+LnR6ZXJvLnYxLnBheW1lbnRfaW50ZW50LnJlY2lwaWVudC5SZWplY3RQYXltZW50SW50ZW50UmVzcG9uc2UiA5ACAkLbAQolY29tLnR6ZXJvLnYxLnBheW1lbnRfaW50ZW50LnJlY2lwaWVudEIOUmVjaXBpZW50UHJvdG9QAaICBFRWUFKqAiBUemVyby5WMS5QYXltZW50SW50ZW50LlJlY2lwaWVudMoCIFR6ZXJvXFYxXFBheW1lbnRJbnRlbnRcUmVjaXBpZW504gIsVHplcm9cVjFcUGF5bWVudEludGVudFxSZWNpcGllbnRcR1BCTWV0YWRhdGHqAiNUemVybzo6VjE6OlBheW1lbnRJbnRlbnQ6OlJlY2lwaWVudGIGcHJvdG8z", [file_tzero_v1_common_common, file_tzero_v1_common_payment_method]);

/**
 * @generated from message tzero.v1.payment_intent.recipient.CreatePaymentIntentRequest
 */
export type CreatePaymentIntentRequest = Message<"tzero.v1.payment_intent.recipient.CreatePaymentIntentRequest"> & {
  /**
   * *
   * Idempotency Key
   * payment reference to identify payment by client.
   *
   * idempotency key
   *
   * @generated from field: string payment_reference = 10;
   */
  paymentReference: string;

  /**
   * *
   * Pay-in currency
   *
   * pay-in currency
   *
   * @generated from field: string pay_in_currency = 20;
   */
  payInCurrency: string;

  /**
   * *
   * Amount denominated in the pay-in currency
   *
   * @generated from field: tzero.v1.common.Decimal pay_in_amount = 30;
   */
  payInAmount?: Decimal;

  /**
   * *
   * Payout currency
   *
   * pay-out currency
   *
   * @generated from field: string pay_out_currency = 40;
   */
  payOutCurrency: string;

  /**
   * *
   * Payout payment method
   *
   * @generated from field: tzero.v1.common.PaymentMethod pay_out_method = 50;
   */
  payOutMethod?: PaymentMethod;
};

/**
 * Describes the message tzero.v1.payment_intent.recipient.CreatePaymentIntentRequest.
 * Use `create(CreatePaymentIntentRequestSchema)` to create a new message.
 */
export const CreatePaymentIntentRequestSchema: GenMessage<CreatePaymentIntentRequest> = /*@__PURE__*/
  messageDesc(file_tzero_v1_payment_intent_recipient_recipient, 0);

/**
 * @generated from message tzero.v1.payment_intent.recipient.CreatePaymentIntentResponse
 */
export type CreatePaymentIntentResponse = Message<"tzero.v1.payment_intent.recipient.CreatePaymentIntentResponse"> & {
  /**
   * @generated from field: uint64 payment_intent_id = 10;
   */
  paymentIntentId: bigint;

  /**
   * @generated from field: repeated tzero.v1.payment_intent.recipient.CreatePaymentIntentResponse.PaymentMethod pay_in_payment_methods = 20;
   */
  payInPaymentMethods: CreatePaymentIntentResponse_PaymentMethod[];
};

/**
 * Describes the message tzero.v1.payment_intent.recipient.CreatePaymentIntentResponse.
 * Use `create(CreatePaymentIntentResponseSchema)` to create a new message.
 */
export const CreatePaymentIntentResponseSchema: GenMessage<CreatePaymentIntentResponse> = /*@__PURE__*/
  messageDesc(file_tzero_v1_payment_intent_recipient_recipient, 1);

/**
 * @generated from message tzero.v1.payment_intent.recipient.CreatePaymentIntentResponse.PaymentMethod
 */
export type CreatePaymentIntentResponse_PaymentMethod = Message<"tzero.v1.payment_intent.recipient.CreatePaymentIntentResponse.PaymentMethod"> & {
  /**
   * @generated from field: string payment_url = 10;
   */
  paymentUrl: string;

  /**
   * @generated from field: uint32 provider_id = 20;
   */
  providerId: number;

  /**
   * @generated from field: tzero.v1.common.PaymentMethodType payment_method = 30;
   */
  paymentMethod: PaymentMethodType;
};

/**
 * Describes the message tzero.v1.payment_intent.recipient.CreatePaymentIntentResponse.PaymentMethod.
 * Use `create(CreatePaymentIntentResponse_PaymentMethodSchema)` to create a new message.
 */
export const CreatePaymentIntentResponse_PaymentMethodSchema: GenMessage<CreatePaymentIntentResponse_PaymentMethod> = /*@__PURE__*/
  messageDesc(file_tzero_v1_payment_intent_recipient_recipient, 1, 0);

/**
 * @generated from message tzero.v1.payment_intent.recipient.ConfirmPaymentRequest
 */
export type ConfirmPaymentRequest = Message<"tzero.v1.payment_intent.recipient.ConfirmPaymentRequest"> & {
  /**
   * payment_intent_id from the CreatePaymentIntentRequest
   *
   * @generated from field: uint64 payment_intent_id = 10;
   */
  paymentIntentId: bigint;

  /**
   * @generated from field: string payment_reference = 20;
   */
  paymentReference: string;

  /**
   * @generated from field: tzero.v1.common.PaymentMethodType payment_method = 30;
   */
  paymentMethod: PaymentMethodType;
};

/**
 * Describes the message tzero.v1.payment_intent.recipient.ConfirmPaymentRequest.
 * Use `create(ConfirmPaymentRequestSchema)` to create a new message.
 */
export const ConfirmPaymentRequestSchema: GenMessage<ConfirmPaymentRequest> = /*@__PURE__*/
  messageDesc(file_tzero_v1_payment_intent_recipient_recipient, 2);

/**
 * @generated from message tzero.v1.payment_intent.recipient.ConfirmPaymentIntentResponse
 */
export type ConfirmPaymentIntentResponse = Message<"tzero.v1.payment_intent.recipient.ConfirmPaymentIntentResponse"> & {
};

/**
 * Describes the message tzero.v1.payment_intent.recipient.ConfirmPaymentIntentResponse.
 * Use `create(ConfirmPaymentIntentResponseSchema)` to create a new message.
 */
export const ConfirmPaymentIntentResponseSchema: GenMessage<ConfirmPaymentIntentResponse> = /*@__PURE__*/
  messageDesc(file_tzero_v1_payment_intent_recipient_recipient, 3);

/**
 * @generated from message tzero.v1.payment_intent.recipient.RejectPaymentIntentRequest
 */
export type RejectPaymentIntentRequest = Message<"tzero.v1.payment_intent.recipient.RejectPaymentIntentRequest"> & {
  /**
   * payment_intent_id from the CreatePaymentIntentRequest
   *
   * @generated from field: uint64 payment_intent_id = 10;
   */
  paymentIntentId: bigint;

  /**
   * payment_reference from the CreatePaymentIntentRequest
   *
   * @generated from field: string payment_reference = 20;
   */
  paymentReference: string;

  /**
   * @generated from field: string reason = 30;
   */
  reason: string;
};

/**
 * Describes the message tzero.v1.payment_intent.recipient.RejectPaymentIntentRequest.
 * Use `create(RejectPaymentIntentRequestSchema)` to create a new message.
 */
export const RejectPaymentIntentRequestSchema: GenMessage<RejectPaymentIntentRequest> = /*@__PURE__*/
  messageDesc(file_tzero_v1_payment_intent_recipient_recipient, 4);

/**
 * @generated from message tzero.v1.payment_intent.recipient.RejectPaymentIntentResponse
 */
export type RejectPaymentIntentResponse = Message<"tzero.v1.payment_intent.recipient.RejectPaymentIntentResponse"> & {
};

/**
 * Describes the message tzero.v1.payment_intent.recipient.RejectPaymentIntentResponse.
 * Use `create(RejectPaymentIntentResponseSchema)` to create a new message.
 */
export const RejectPaymentIntentResponseSchema: GenMessage<RejectPaymentIntentResponse> = /*@__PURE__*/
  messageDesc(file_tzero_v1_payment_intent_recipient_recipient, 5);

/**
 * *
 * NetworkService is used by recipient to create a payment intents
 *
 * @generated from service tzero.v1.payment_intent.recipient.NetworkService
 */
export const NetworkService: GenService<{
  /**
   * @generated from rpc tzero.v1.payment_intent.recipient.NetworkService.CreatePaymentIntent
   */
  createPaymentIntent: {
    methodKind: "unary";
    input: typeof CreatePaymentIntentRequestSchema;
    output: typeof CreatePaymentIntentResponseSchema;
  },
}> = /*@__PURE__*/
  serviceDesc(file_tzero_v1_payment_intent_recipient_recipient, 0);

/**
 * *
 * RecipientService is implemented by recipient in order to get updates on payment intents
 *
 * @generated from service tzero.v1.payment_intent.recipient.RecipientService
 */
export const RecipientService: GenService<{
  /**
   * *
   * notifies recipient about successful payment
   *
   * @generated from rpc tzero.v1.payment_intent.recipient.RecipientService.ConfirmPayment
   */
  confirmPayment: {
    methodKind: "unary";
    input: typeof ConfirmPaymentRequestSchema;
    output: typeof ConfirmPaymentIntentResponseSchema;
  },
  /**
   * *
   * notifies recipient about failed payment
   *
   * @generated from rpc tzero.v1.payment_intent.recipient.RecipientService.RejectPaymentIntent
   */
  rejectPaymentIntent: {
    methodKind: "unary";
    input: typeof RejectPaymentIntentRequestSchema;
    output: typeof RejectPaymentIntentResponseSchema;
  },
}> = /*@__PURE__*/
  serviceDesc(file_tzero_v1_payment_intent_recipient_recipient, 1);

