import ServerError from './ServerError';

export default class UnauthorizedError extends ServerError {
  constructor() {
    super('User in unauthorized', 403);
  }
}
