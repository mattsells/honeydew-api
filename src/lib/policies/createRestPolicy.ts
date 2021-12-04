import UnauthorizedError from '@/lib/error/UnauthorizedError';

import Policy, { PolicyUser } from './Policy';

export default function createRestPolicy(definitions = {}) {
  const policy = new Policy(definitions);

  return (...args: [string, PolicyUser?, any?]) => {
    const isAuthorized = policy.authorize(...args);

    if (!isAuthorized) {
      throw new UnauthorizedError();
    }
  };
}
