import express from "express"
import Stripe from "stripe"

const { Router } = express;
const stripe = Stripe('sk_test_51KBLZ1He6HcPaamicMRz49bXwe8Rsz4he3z5ZR4mIEj8tC6ixXirdH7m4Rv5ROGWTNUj1isEyuA6PeFMglmrM2iA00HxZpMD4b')
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

export default paymentController;