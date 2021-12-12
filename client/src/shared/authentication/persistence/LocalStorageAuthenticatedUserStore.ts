import { AuthenticatedUserStore } from './AuthenticatedUserStore';
import { AuthenticatedUser } from './AuthenticatedUser';

export class LocalStorageAuthenticatedUserStore implements AuthenticatedUserStore {

    private readonly AUTHENTICATED_USER_KEY = 'skillset-authenticated-user';

    set(authenticatedUser: AuthenticatedUser): void {
        const formattedUser = JSON.stringify(authenticatedUser);
        localStorage.setItem(this.AUTHENTICATED_USER_KEY, formattedUser);
    }

    get(): AuthenticatedUser | undefined {
        const persistedUser = localStorage.getItem(this.AUTHENTICATED_USER_KEY);
        if (!persistedUser) return undefined;

        return JSON.parse(persistedUser);
    }

    clear(): void {
        localStorage.clear();
    }
    
}