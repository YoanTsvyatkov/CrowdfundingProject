const express = require("express");
const Stripe = require("stripe");
const bodyParser = require('body-parser');
const { PaymentService } = require('../service/payment-service')

const { Router } = express;
const stripe = Stripe('sk_test_51KBLZ1He6HcPaamicMRz49bXwe8Rsz4he3z5ZR4mIEj8tC6ixXirdH7m4Rv5ROGWTNUj1isEyuA6PeFMglmrM2iA00HxZpMD4b')
const paymentController = Router();
const endpointSecret = "whsec_NzMTAp08JwMiS6CHaZVMDSmpBValGG18";
const paymentService = new PaymentService();

const fulfillOrder = async(session) => {
    const startupId = session.metadata.startupId;
    const userId = session.metadata.userId;
    const amount = session.amount_total;

    await paymentService.invest(amount, startupId, userId);
}

paymentController.post("/checkout", async(req, res) => {
    const session = await stripe.checkout.sessions.create({
        line_items: [{
            price_data: {
                currency: 'bgn',
                product_data: {
                    name: req.body.projectTitle,
                },
                unit_amount: req.body.amount,
            },
            quantity: 1,
        }, ],
        mode: 'payment',
        success_url: 'https://example.com/success',
        cancel_url: 'https://example.com/cancel',
        amount_total: req.body.amount,
        metadata: { startupId: req.body.startupId, userId: req.body.userId }
    });

    res.redirect(303, session.url);
})

paymentController.post('/webhook', bodyParser.raw({ type: '*/*' }), (request, response) => {
    const sig = request.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
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


exports.paymentController = paymentController;