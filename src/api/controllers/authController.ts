import { Request, Response, NextFunction } from 'express';

import { Container } from 'typedi';
import AuthService from '../../services/auth';
import autobind from '../../utils/autobindDecorator';

export default class AuthController {
  public authService: any;
  constructor() {
    this.authService = Container.get(AuthService);
  }

  @autobind
  public async signup(req: Request, res: Response, next: NextFunction) {
    const result = await this.authService.SignUp(req.body);
    res.status(200).json(result);
  }

  @autobind
  public async signin(req: Request, res: Response, next: NextFunction) {
    const result = await this.authService.SignIn(req.body);
    res.status(200).json(result);
  }
}
