import { Request } from 'express';

import { DEFAULT_RESPONSE_LIMIT, QUERY_LIMIT_KEY, QUERY_OFFSET_KEY } from '@/config';

function paramToNumber(value: any, defaultValue: number): number {
  if (!value || typeof value !== 'string') {
    return defaultValue;
  }

  return parseInt(value, 10);
}

type PaginationParams = {
  skip: number;
  take: number;
}

export function paginate(req: Request): PaginationParams {
  return {
    skip: paramToNumber(req.query[QUERY_OFFSET_KEY], 0),
    take: paramToNumber(req.query[QUERY_LIMIT_KEY], DEFAULT_RESPONSE_LIMIT),
  };
}
