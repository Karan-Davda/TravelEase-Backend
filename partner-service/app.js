import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import agencyRoutes from './routes/agencyRoutes.js';
import guideRoutes from './routes/guideRoutes.js';
import packageRoutes from './routes/packageRoutes.js';
import { applySecurity } from './config/security.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;

applySecurity(app);

// Health check
app.get('/ping', (req, res) => {
  res.send('Partner Service is running ✅');
});

app.use((req, res, next) => {
  console.log(`🛡️ [PARTNER SERVICE] Received: ${req.method} ${req.originalUrl}`);
  next();
});

// Routes
app.use('/api/agency', agencyRoutes);
app.use('/api/guide', guideRoutes);
app.use('/api/partners', packageRoutes);

app.listen(PORT, () => {
  console.log(`Partner Service running on http://localhost:${PORT}`);
});