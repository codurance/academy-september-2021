import {AuthenticatedUser, AuthenticatedUserStore} from '../shared/authentication/persistence';
import {instance, mock, verify, when} from "ts-mockito";
import {ApplicationNavigator} from "../shared/navigation";
import {Authenticator} from "../shared/authentication/authenticator";
import {LoginService} from "./LoginService";

describe('LoginService', () => {

    const authenticator = mock<Authenticator>();
    const authenticatedUserStore = mock<AuthenticatedUserStore>();
    const applicationNavigator = mock<ApplicationNavigator>();

    const loginService = new LoginService(
        instance(authenticator),
        instance(authenticatedUserStore),
        instance(applicationNavigator)
    );

    it('should redirect to home page after persisting authenticated user on successful login attempt', async () => {
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
    
});