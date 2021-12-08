import ServerError from './ServerError';

export default class UnauthorizedError extends ServerError {
  constructor() {
    super('You are not authorized to perform this action', 403);
  }
}
