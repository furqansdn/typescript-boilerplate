import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import config from '../config';
import routers from '../api';
import { AppError, HTTPNotFound } from '../utils/AppError';
import globalErrorHandler from '../api/middleware/globalErrorHandler';

export default ({ app }: { app: express.Application }) => {
  /**
   * Check Health Status
   */
  app.get('/status', (req, res) => {
    res.status(200).end();
  });

  /**
   * Enable Cors
   */
  app.use(cors());

  /**
   * Transform req raw string into JSON format
   */
  app.use(bodyParser.json({ limit: '10mb' }));

  /**
   * Load Route API Handler
   */
  app.use(config.api.prefix, routers());

  /**
   * Catch error when route is not defined
   * 404
   */
  app.use((req, res, next) => {
    throw new HTTPNotFound(
      `Page you are looking for ${req.originalUrl} is not found`
    );
  });

  /**
   * Global Error Handler
   */
  app.use(globalErrorHandler);
};
