import cors from 'cors';
import helmet from 'helmet';
import express from 'express';

export const applySecurity = (app) => {
  app.use(helmet());

  app.use(cors({
    origin: ['http://localhost:8080', 'http://localhost:3004'], // adjust as needed
    credentials: true,
  }));
};