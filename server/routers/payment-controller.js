import express from "express"
import Stripe from "stripe"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, "..", ".env")

dotenv.config({path: envPath});

const { Router } = express;
const stripe = Stripe(process.env.SECRET)
console.log("Secret " + process.env.SECRET)
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