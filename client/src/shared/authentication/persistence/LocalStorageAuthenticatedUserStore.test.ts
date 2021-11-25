import { LocalStorageAuthenticatedUserStore } from './LocalStorageAuthenticatedUserStore';
import { AuthenticatedUser } from './AuthenticatedUser';

describe('LocalStorageAuthenticatedUserStore', () => {

    let localStorageAuthenticatedUserStore: LocalStorageAuthenticatedUserStore;

    beforeEach(() => {
        localStorageAuthenticatedUserStore = new LocalStorageAuthenticatedUserStore();
    });

    it('should return nothing if no user persisted in local storage', () => {
        expect(localStorageAuthenticatedUserStore.get()).toBeNull();
    });

    it('should return persisted user', () => {
        const authenticatedUser: AuthenticatedUser = {
            name: "Best User",
            email: "best.user@codurance.com",
            profileImageUrl: 'https://hosting.site/profile/best-user-image.png',
            accessToken: "access-token"
        };
        localStorageAuthenticatedUserStore.set(authenticatedUser);

        const persistedUser = localStorageAuthenticatedUserStore.get();

        expect(persistedUser).toEqual(authenticatedUser);
    });

});