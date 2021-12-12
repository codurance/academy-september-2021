import {AuthenticatedUser, AuthenticatedUserStore} from '../persistence';
import {instance, mock, verify, when} from "ts-mockito";
import {ApplicationNavigator} from "../../navigation";
import {Authenticator} from "../authenticator";
import {AuthenticatedUserService} from "./AuthenticatedUserService";

describe('authenticated user service should', () => {
    const authenticatedUser: AuthenticatedUser = {
        name: 'Best User',
        email: 'best.user@codurance.com',
        profileImageUrl: 'https://hosting.site/profile/best-user-image.png',
        accessToken: 'access-token'
    };

    const authenticator = mock<Authenticator>();
    const authenticatedUserStore = mock<AuthenticatedUserStore>();
    const applicationNavigator = mock<ApplicationNavigator>();

    const authenticatedUserService = new AuthenticatedUserService(
        instance(authenticator),
        instance(authenticatedUserStore),
        instance(applicationNavigator)
    );

    it('get the current authenticated user', () => {
        when(authenticatedUserStore.get()).thenReturn(authenticatedUser);

        const persistedAuthenticatedUser = authenticatedUserService.getAuthenticatedUser();

        expect(persistedAuthenticatedUser).toEqual(authenticatedUser);
    });

    it('not have a valid session when user has not logged in yet', () => {
        when(authenticatedUserStore.get()).thenReturn(undefined);

        const hasValidSession = authenticatedUserService.hasValidSession();

        expect(hasValidSession).toBeFalsy();
    });

    it('not have a valid session when logged in users access token is invalid', () => {
        const userWithInvalidToken = {accessToken: 'invalid-token'} as AuthenticatedUser;
        when(authenticatedUserStore.get()).thenReturn(userWithInvalidToken);
        when(authenticator.isValidToken('invalid-token')).thenReturn(false);

        const hasValidSession = authenticatedUserService.hasValidSession();

        expect(hasValidSession).toBeFalsy();
    });

    it('have a valid session when logged in users access token is valid', () => {
        when(authenticatedUserStore.get()).thenReturn(authenticatedUser);
        when(authenticator.isValidToken('access-token')).thenReturn(true);

        const hasValidSession = authenticatedUserService.hasValidSession();

        expect(hasValidSession).toBeTruthy();
    });

    it('redirect to home page after persisting authenticated user on successful login attempt', async () => {
        when(authenticator.getAuthenticatedUser()).thenResolve(authenticatedUser);

        await authenticatedUserService.login();

        verify(authenticatedUserStore.set(authenticatedUser)).calledBefore(applicationNavigator.navigateToHome());
    });

    it('redirect to login after clearing authenticated user on logout', () => {
        authenticatedUserService.logout();

        verify(authenticatedUserStore.clear()).calledBefore(applicationNavigator.navigateToLogin());
    });
    
});