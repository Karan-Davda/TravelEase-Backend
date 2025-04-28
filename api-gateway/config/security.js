import cors from 'cors';
import helmet from 'helmet';
import express from 'express';

export const applySecurity = (app) => {
  app.use(helmet());

  app.use(cors({
    origin: ['http://localhost:5173'], // adjust as needed
    credentials: true,
  }));
};