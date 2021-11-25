import {Authenticator} from "../shared/authentication/authenticator";
import {AuthenticatedUserStore} from "../shared/authentication/persistence";
import {ApplicationNavigator} from "../shared/navigation";

export class LoginService {

    private authenticator: Authenticator;
    private authenticatedUserStore: AuthenticatedUserStore;
    private applicationNavigator: ApplicationNavigator;

    constructor(authenticator: Authenticator, authenticatedUserStore: AuthenticatedUserStore, applicationNavigator: ApplicationNavigator) {
        this.authenticator = authenticator;
        this.authenticatedUserStore = authenticatedUserStore;
        this.applicationNavigator = applicationNavigator;
    }

    public async login(): Promise<void> {
        const authenticatedUser = await this.authenticator.getAuthenticatedUser();
        this.authenticatedUserStore.set(authenticatedUser);
        this.applicationNavigator.navigateToHome();
    }

}