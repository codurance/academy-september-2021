import {LocalStorageAuthenticatedUserStore} from './LocalStorageAuthenticatedUserStore';
import {AuthenticatedUser} from './AuthenticatedUser';

describe('local storage authenticated user store should', () => {

    const authenticatedUser: AuthenticatedUser = {
        name: "Best User",
        email: "best.user@codurance.com",
        profileImageUrl: 'https://hosting.site/profile/best-user-image.png',
        accessToken: "access-token"
    };

    let localStorageAuthenticatedUserStore: LocalStorageAuthenticatedUserStore;

    beforeEach(() => {
        localStorageAuthenticatedUserStore = new LocalStorageAuthenticatedUserStore();
    });

    it('return nothing if no user persisted in local storage', () => {
        expect(localStorageAuthenticatedUserStore.get()).toBeUndefined();
    });

    it('return persisted user', () => {
        localStorageAuthenticatedUserStore.set(authenticatedUser);

        const persistedUser = localStorageAuthenticatedUserStore.get();

        expect(persistedUser).toEqual(authenticatedUser);
    });

    it('clear local storage', () => {
        localStorageAuthenticatedUserStore.set(authenticatedUser);

        localStorageAuthenticatedUserStore.clear();

        expect(localStorageAuthenticatedUserStore.get()).toBeUndefined();
    });
});