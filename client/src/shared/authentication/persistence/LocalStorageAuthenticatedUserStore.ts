import { AuthenticatedUserStore } from './AuthenticatedUserStore';
import { AuthenticatedUser } from './AuthenticatedUser';

export class LocalStorageAuthenticatedUserStore implements AuthenticatedUserStore {

    private readonly AUTHENTICATED_USER_KEY = 'skillset-authenticated-user';

    set(authenticatedUser: AuthenticatedUser): void {
        const formattedUser = JSON.stringify(authenticatedUser);
        localStorage.setItem(this.AUTHENTICATED_USER_KEY, formattedUser);
    }

    get(): AuthenticatedUser | null {
        const persistedUser = localStorage.getItem(this.AUTHENTICATED_USER_KEY);
        if (!persistedUser) return null;

        return JSON.parse(persistedUser);
    }
    
}