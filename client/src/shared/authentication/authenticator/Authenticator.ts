import { AuthenticatedUser } from '../persistence';

export interface Authenticator {

  isValidToken(token: string): boolean;

  getAuthenticatedUser(): Promise<AuthenticatedUser>;

}