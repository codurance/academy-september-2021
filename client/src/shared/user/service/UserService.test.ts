import {AuthenticatedUser, AuthenticatedUserStore} from '../../authentication/persistence';
import {instance, mock, verify, when} from "ts-mockito";
import {ApplicationNavigator} from "../../navigation";
import {Authenticator} from "../../authentication/authenticator";
import {UserService} from "./UserService";

describe('user service should', () => {
    const authenticator = mock<Authenticator>();
    const authenticatedUserStore = mock<AuthenticatedUserStore>();
    const applicationNavigator = mock<ApplicationNavigator>();

    const loginService = new UserService(
        instance(authenticator),
        instance(authenticatedUserStore),
        instance(applicationNavigator)
    );

    it('redirect to home page after persisting authenticated user on successful login attempt', async () => {
        const authenticatedUser: AuthenticatedUser = {
            name: "Best User",
            email: "best.user@codurance.com",
            profileImageUrl: 'https://hosting.site/profile/best-user-image.png',
            accessToken: "access-token"
        };
        when(authenticator.getAuthenticatedUser()).thenResolve(authenticatedUser);

        await loginService.login();

        verify(authenticatedUserStore.set(authenticatedUser)).calledBefore(applicationNavigator.navigateToHome());
    });

    it('redirect to login after clearing authenticated user on logout', () => {
        loginService.logout();

        verify(authenticatedUserStore.clear()).calledBefore(applicationNavigator.navigateToLogin());
    });
    
});