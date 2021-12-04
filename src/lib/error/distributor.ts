import { Request, Response, NextFunction } from 'express';

import ServerError from './ServerError';

export default function errorDistributor(
  error: ServerError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.status(error.status);
  res.json({ error: error.message });

  return next();
}
