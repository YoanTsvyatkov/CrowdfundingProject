const express = require("express");
const Stripe = require("stripe");

const { Router } = express;
const stripe = Stripe('sk_test_51KBLZ1He6HcPaamicMRz49bXwe8Rsz4he3z5ZR4mIEj8tC6ixXirdH7m4Rv5ROGWTNUj1isEyuA6PeFMglmrM2iA00HxZpMD4b')
const paymentController = Router();

paymentController.post("/checkout", async(req, res) => {
    let amount = (parseFloat(req.body.amount) * 100).toString()

    const session = await stripe.checkout.sessions.create({
        line_items: [{
            price_data: {
                currency: 'bgn',
                product_data: {
                    name: req.body.projectTitle,
                },
                unit_amount: amount,
            },
            quantity: 1,
        }, ],
        mode: 'payment',
        success_url: 'https://example.com/success',
        cancel_url: 'https://example.com/cancel',
        metadata: { startupId: req.body.startupId, userId: req.body.userId }
    });

    res.json({ url: session.url })
})

exports.paymentController = paymentController;