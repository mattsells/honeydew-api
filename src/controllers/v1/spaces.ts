import { Request, Response } from 'express';

export function create(req: Request, res: Response) {
  console.log(req.body);

  res.json(req.body);
}

export function get(req: Request, res: Response) {
  console.log(req.body);

  res.json(req.body);
}
