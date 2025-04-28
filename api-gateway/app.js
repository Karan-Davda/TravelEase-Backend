import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { applySecurity } from './config/security.js'

dotenv.config();
const app = express();

applySecurity(app);

// Health Check
app.get('/ping', (req, res) => res.send('API Gateway is running ✅'));

// 🔐 AUTH SERVICE PROXY - PRESERVE FULL PATH
app.use(
  '/',
  createProxyMiddleware({
    target: process.env.AUTH_SERVICE,
    changeOrigin: true,
    router: {
      '/api/auth': process.env.AUTH_SERVICE
    },
    logLevel: 'debug',
    preserveHeaderKeyCase: true
  })
);

app.use('/api/bookings', createProxyMiddleware({ target: process.env.BOOKING_SERVICE, changeOrigin: true }));
app.use('/api/partners', createProxyMiddleware({ target: process.env.PARTNER_SERVICE, changeOrigin: true }));
app.use('/api/payments', createProxyMiddleware({ target: process.env.PAYMENT_SERVICE, changeOrigin: true }));
app.use('/api/notifications', createProxyMiddleware({ target: process.env.NOTIFICATION_SERVICE, changeOrigin: true }));

// Start
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API Gateway running at http://localhost:${PORT}`);
});