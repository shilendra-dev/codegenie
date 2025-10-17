import express from 'express';
import cors from 'cors';
import { config } from './config/index.js';
import './routes'; //this imports all the routes
import { routes } from './lib/ApiRouter';

export const createApp = (): express.Express => {
  const app = express();

  // Apply CORS middleware
  app.use(cors(config.security.cors));
  app.use(express.json());

  // Health check endpoint
  app.get('/health', (_req, res) => {
    res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: config.server.environment
    });
  });

  //setting up routes
  app.use("/api", routes);

  return app;
};