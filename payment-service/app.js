import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import paymentRoutes from './routes/paymentRoutes.js';
import { applySecurity } from './config/security'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3004;

applySecurity(app);

// Health check
app.get('/ping', (req, res) => {
  res.send('Payment Service is running ✅');
});

// Routes
app.use('/api/payments', paymentRoutes);

app.listen(PORT, () => {
  console.log(`Payment Service running on http://localhost:${PORT}`);
});