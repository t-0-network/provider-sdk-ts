/**
 Example on how to interact with network using SDK
 */

import {
    Blockchain, createClient,
    Decimal,
    DecimalSchema,
    DEFAULT_ENDPOINT,
    PaymentMethodType
} from "../../";
import {NetworkService} from "../../payment_intent/provider";
import dotenv from 'dotenv';
import {create} from "@bufbuild/protobuf";

const toProtoDecimal = (unscaled: number, exponent: number): Decimal => {
    return create(DecimalSchema, {
        unscaled: BigInt(unscaled),
        exponent: exponent,
    });
}

async function main() {
    dotenv.config();
    const privateKeyHex = process.env.PROVIDER_PRIVATE_KEY!;
    const endpoint = process.env.TZERO_ENDPOINT || DEFAULT_ENDPOINT;

    // PayIn provider will interact with the network using the NetworkServiceClient.
    // It will use ConfirmPayment/RejectPaymentIntent rpcs to notify the network about the payment intent status.
    // ConfirmSettlement rpc should be used to notify the network about the settlement transfer (in case of pre-settlement).
    const networkClient = createClient(privateKeyHex, endpoint, NetworkService);

    // PayIn provider will also implement the ProviderServiceHandler interface
    // which has only 2 methods:
    // 1. CreatePaymentIntent - to create a payment intent and return the list of
    //    available payment methods along with the URL to redirect user to make the payment.
    // 2. ConfirmPayout - to confirm the payout after the payment is completed successfully.
    // Initialize a provider service handler using your implementation of the
    // ProviderServiceHandler interface.

    // The flow starts when the network call the CreatePaymentIntent method of the PayIn provider.

    // Pay-in provider will return the list of available payment methods, and when it receives the payment from the payer,
    // it will call the ConfirmPayout method to confirm the payout.
    const updateResponse = await networkClient.confirmPayment({
        paymentIntentId: 123n, // Example payment intent ID
        paymentMethod: PaymentMethodType.CARD
    })


    // if the payment collection was not successful, the provider will call RejectPaymentIntent method to notify
    //the network about the failure.
    const rejectResponse = await networkClient.rejectPaymentIntent({
        paymentIntentId: 123n, // Example payment intent ID
        reason: 'Payment failed' // Example reason for rejection
    })

    // Next step would be to transfer the settlement amount to the pay-out provider, and
    // then call the ConfirmSettlement endpoint
    const resp = await networkClient.confirmSettlement({
        paymentIntentId: [123n], // Example payment intent ID
        blockchain: Blockchain.TRON, // Example blockchain
        txHash: '0x123456' // Example transaction hash
    })

    // And the last step - ConfirmPayout rpc will be called by Network to finalize the process.
}

void main();



