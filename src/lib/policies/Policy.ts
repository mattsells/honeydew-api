import ServerError from '../error/ServerError';

export type PolicyUser = {
  id: number;
  email: string;
}

type ActionDefinition = (user?: PolicyUser, record?: any) => boolean;

type PolicyDefinition = {
  [k: string]: ActionDefinition
}

class Policy {
  private definitions: PolicyDefinition = {};

  constructor(definitions: PolicyDefinition) {
    this.definitions = definitions;
  }

  authorize(action: string, user?: PolicyUser, record?: any): boolean {
    if (!this.definitions[action]) {
      return false;
    }

    try {
      return this.definitions[action](user, record);
    } catch (err) {
      throw new ServerError('Error in authorization determination', 500);
    }
  }
}

export default Policy;
