const express = require("express");
const Stripe =require("stripe");

const { Router } = express;
const stripe = Stripe('pk_test_51KBLZ1He6HcPaami8OlgWuZD3dHu8kLCm3aqeZ6US9u7vYBi1RrO4D67tlqYey9f0TmQQy7UlBdy9UILBtdDiimt00RAngcDh3')
const paymentController = Router();

paymentController.post("/checkout", async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'T-shirt',
              },
              unit_amount: 2000,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: 'https://example.com/success',
        cancel_url: 'https://example.com/cancel',
      });
    
      res.redirect(303, session.url);
})

exports.paymentController=paymentController;