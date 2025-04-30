import express from 'express';
import dotenv from 'dotenv';
import { applySecurity } from './config/security.js'
import authRoutes from './routes/authRoutes.js'
import menuRoutes from './routes/menuRoutes.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
applySecurity(app);

// Health check route
app.get('/ping', (req, res) => {
  res.send('Auth Service is running ✅');
});

app.use((req, res, next) => {
  console.log(`🛡️ [AUTH SERVICE] Received: ${req.method} ${req.originalUrl}`);
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Auth Service running on http://localhost:${PORT}`);
});
