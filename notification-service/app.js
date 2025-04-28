import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import notificationRoutes from './routes/notificationRoutes.js';
import { applySecurity } from './config/security'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3005;

applySecurity(app);

// Health check
app.get('/ping', (req, res) => {
  res.send('Notification Service is running ✅');
});

// Routes
app.use('/api/notifications', notificationRoutes);

app.listen(PORT, () => {
  console.log(`Notification Service running on http://localhost:${PORT}`);
});