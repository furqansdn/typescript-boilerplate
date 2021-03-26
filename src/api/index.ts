import { Router } from 'express';

import authRoute from './routes/auth';

export default () => {
  const app = Router();

  authRoute(app);
  return app;
};
