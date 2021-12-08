import { Express } from 'express';

import ServerError from '../error/ServerError';

type ActionDefinition = (user?: Express.User, record?: any) => boolean | Promise<boolean>;

export type PolicyDefinition = {
  [k: string]: ActionDefinition
}

class Policy {
  private definitions: PolicyDefinition = {};

  constructor(definitions: PolicyDefinition) {
    this.definitions = definitions;
  }

  async authorize(action: string, user?: Express.User, record?: any): Promise<boolean> {
    if (!this.definitions[action]) {
      return false;
    }

    try {
      return await this.definitions[action](user, record);
    } catch (err) {
      throw new ServerError('Error in authorization determination', 500);
    }
  }
}

export default Policy;
