import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import paymentRoutes from './routes/paymentRoutes.js';
import { stripeWebhookHandler } from './controllers/paymentController.js';
import { applySecurity } from './config/security.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3004;

// app.use((req, res, next) => {
//   console.log(`🛡️ [Payments SERVICE] Received: ${req.method} ${req.originalUrl}`);
//   next();
// });

// Must go BEFORE any express.json/bodyParser.json middleware
app.post('/api/stripe/webhook', bodyParser.raw({ type: 'application/json' }), stripeWebhookHandler);

// Other middlewares
applySecurity(app); // If this includes JSON parser, this order is crucial
app.use(cors());
app.use(express.json());



// Routes (after webhook)
app.use('/api/payments', paymentRoutes);

app.listen(PORT, () => {
  console.log(`Payment Service running on http://localhost:${PORT}`);
});