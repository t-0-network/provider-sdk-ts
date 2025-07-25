// @generated by protoc-gen-es v2.6.0 with parameter "target=ts"
// @generated from file common/payment_method.proto (package tzero.v1.common, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage } from "@bufbuild/protobuf/codegenv2";
import { fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv2";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file common/payment_method.proto.
 */
export const file_common_payment_method: GenFile = /*@__PURE__*/
  fileDesc("Chtjb21tb24vcGF5bWVudF9tZXRob2QucHJvdG8SD3R6ZXJvLnYxLmNvbW1vbiJOCg1QYXltZW50TWV0aG9kEjIKBHNlcGEYCiABKAsyIi50emVyby52MS5jb21tb24uU2VwYVBheW1lbnRNZXRob2RIAEIJCgdkZXRhaWxzIkoKEVNlcGFQYXltZW50TWV0aG9kEgwKBGliYW4YCiABKAkSGQoRcGF5bWVudF9yZWZlcmVuY2UYFCABKAkSDAoEbmFtZRgeIAEoCUKHAQoTY29tLnR6ZXJvLnYxLmNvbW1vbkISUGF5bWVudE1ldGhvZFByb3RvUAGiAgNUVkOqAg9UemVyby5WMS5Db21tb27KAg9UemVyb1xWMVxDb21tb27iAhtUemVyb1xWMVxDb21tb25cR1BCTWV0YWRhdGHqAhFUemVybzo6VjE6OkNvbW1vbmIGcHJvdG8z");

/**
 * @generated from message tzero.v1.common.PaymentMethod
 */
export type PaymentMethod = Message<"tzero.v1.common.PaymentMethod"> & {
  /**
   * @generated from oneof tzero.v1.common.PaymentMethod.details
   */
  details: {
    /**
     * @generated from field: tzero.v1.common.SepaPaymentMethod sepa = 10;
     */
    value: SepaPaymentMethod;
    case: "sepa";
  } | { case: undefined; value?: undefined };
};

/**
 * Describes the message tzero.v1.common.PaymentMethod.
 * Use `create(PaymentMethodSchema)` to create a new message.
 */
export const PaymentMethodSchema: GenMessage<PaymentMethod> = /*@__PURE__*/
  messageDesc(file_common_payment_method, 0);

/**
 * @generated from message tzero.v1.common.SepaPaymentMethod
 */
export type SepaPaymentMethod = Message<"tzero.v1.common.SepaPaymentMethod"> & {
  /**
   * @generated from field: string iban = 10;
   */
  iban: string;

  /**
   * @generated from field: string payment_reference = 20;
   */
  paymentReference: string;

  /**
   * @generated from field: string name = 30;
   */
  name: string;
};

/**
 * Describes the message tzero.v1.common.SepaPaymentMethod.
 * Use `create(SepaPaymentMethodSchema)` to create a new message.
 */
export const SepaPaymentMethodSchema: GenMessage<SepaPaymentMethod> = /*@__PURE__*/
  messageDesc(file_common_payment_method, 1);

