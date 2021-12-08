import { Express } from 'express';

import UnauthorizedError from '@/lib/error/UnauthorizedError';

import Policy, { PolicyDefinition } from './Policy';

export default function createRestPolicy(definitions: PolicyDefinition = {}) {
  const policy = new Policy(definitions);

  return async (...args: [string, Express.User?, any?]): Promise<void> => {
    const isAuthorized = await policy.authorize(...args);

    if (!isAuthorized) {
      throw new UnauthorizedError();
    }
  };
}
