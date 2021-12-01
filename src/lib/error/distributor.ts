import express from 'express';

import ServerError from './ServerError';

export default function errorDistributor(
  error: ServerError,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  res.status(error.status);
  res.json({ error: error.message });

  return next();
}
