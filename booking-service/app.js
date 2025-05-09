import express from 'express';
import { applySecurity } from './config/security.js'
import dotenv from 'dotenv';
import bookingRoutes from './routes/bookingRoutes.js';
import geoConfigRoutes from './routes/geoConfigurationRoutes.js';
import geoRoutes from './routes/geoRoutes.js';
import transportationRoutes from './routes/transportationRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

applySecurity(app);

// Health check
app.get('/ping', (req, res) => {
  res.send('Booking Service is running ✅');
});

app.use((req, res, next) => {
  console.log(`🛡️ [Booking SERVICE] Received: ${req.method} ${req.originalUrl}`);
  next();
});

// Routes
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin/geo', geoConfigRoutes);
app.use('/api/search', geoRoutes);
app.use('/api/transportation', transportationRoutes);

app.listen(PORT, () => {
  console.log(`Booking Service running on http://localhost:${PORT}`);
});