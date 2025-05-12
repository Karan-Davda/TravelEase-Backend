// payment-service/controllers/paymentController.js
import stripe from '../config/stripe.js';
import db from '../config/Database.js';
import getRawBody from 'raw-body';
import axios from 'axios';
import { processSuccessfulPayment } from '../services/paymentHandler.js';

export const createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency = 'usd', metadata } = req.body;

    if (!amount || !metadata || !metadata.seats || typeof metadata.seats !== 'string') {
      return res.status(400).json({ error: 'Invalid payment data provided.' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      metadata: {
        ...metadata,
        seats: metadata.seats
      },
    });
    
    return res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('[Stripe Error]', error);
    return res.status(500).json({ error: 'Payment intent creation failed.' });
  }
};

export const stripeWebhookHandler = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // ✅ req.body is already raw because of bodyParser.raw() in app.js
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);

    console.log('[🔍 Webhook Event]', JSON.stringify(event, null, 2));
  } catch (err) {
    console.error('[Webhook Signature Error]', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const intent = event.data.object;
    try {
      await processSuccessfulPayment(intent.metadata, intent.amount / 100, intent.id);
      return res.status(200).send('Payment processed and booking initiated.');
    } catch (err) {
      console.error('[Processing Error]', err);
      return res.status(500).send('Failed to process payment.');
    }
  }

  return res.status(200).send('Unhandled event type.');
};