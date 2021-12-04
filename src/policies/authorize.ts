import ServerError from '@/lib/error/ServerError';

export default function authorize(isAuthorized: boolean): void {
  if (!isAuthorized) {
    throw new ServerError('User is unauthroized', 403);
  }
}
