import { Router } from 'express';
import catchAsync from '../../utils/catchAsync';
import AuthController from '../controllers/authController';

const route = Router();

export default (app: Router) => {
  app.use('/auth', route);
  const authController = new AuthController();

  route.post('/signup', catchAsync(authController.signup));
  route.post('/signin', catchAsync(authController.signin));
};
