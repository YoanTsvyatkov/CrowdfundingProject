const express = require("express");
const { Router } = express;
const bodyParser = require('body-parser');
const { PaymentService } = require('../service/payment-service')
const Stripe = require("stripe");
const stripe = Stripe('sk_test_51KBLZ1He6HcPaamicMRz49bXwe8Rsz4he3z5ZR4mIEj8tC6ixXirdH7m4Rv5ROGWTNUj1isEyuA6PeFMglmrM2iA00HxZpMD4b')
const endpointSecret = "whsec_NzMTAp08JwMiS6CHaZVMDSmpBValGG18";
const hookController = Router();
const paymentService = new PaymentService();

const fulfillOrder = async(session) => {
    const startupId = session.metadata.startupId;
    const userId = session.metadata.userId;
    const amount = parseInt(session.amount_total) / 100;

    await paymentService.invest(amount, startupId, userId);
}

hookController.post('/webhook', bodyParser.raw({ type: '*/*' }), (request, response) => {
    const sig = request.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            request.body,
            sig,
            endpointSecret);
    } catch (err) {
        return response.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            fulfillOrder(session);
            // Then define and call a function to handle the event checkout.session.completed
            break;
            // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }


    response.status(200);
});


exports.hookController = hookController;