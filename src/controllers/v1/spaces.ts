import { Request, Response, NextFunction } from 'express';

import db from '@/db';
import authorize from '@/policies/spaces';

export async function index(req: Request, res: Response, next: NextFunction) {
  try {
    authorize('index');

    const spaces = await db.space.findMany();

    res.json(spaces);
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response) {
  // check for valid body
  // authorize request
  console.log(req.body);

  res.json(req.body);
}

export async function get(req: Request, res: Response) {
  console.log(req.body);

  res.json(req.body);
}
