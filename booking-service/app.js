import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bookingRoutes from './routes/bookingRoutes.js';
import { applySecurity } from './config/security'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

applySecurity(app);

// Health check
app.get('/ping', (req, res) => {
  res.send('Booking Service is running ✅');
});

// Routes
app.use('/api/bookings', bookingRoutes);

app.listen(PORT, () => {
  console.log(`Booking Service running on http://localhost:${PORT}`);
});