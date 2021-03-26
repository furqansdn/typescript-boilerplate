import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../utils/AppError';

export default (err: any, req: Request, res: Response, next: NextFunction) => {
  /**
   * Only Boilerplate, Still Have to improve
   */
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      errors: {
        message: err.message,
      },
    });
  }
  return res.status(500).json({ message: err.message, errors: err });
};
