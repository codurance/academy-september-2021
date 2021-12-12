import {Authenticator} from "../../authentication/authenticator";
import {AuthenticatedUserStore} from "../../authentication/persistence";
import {ApplicationNavigator} from "../../navigation";

export class UserService {

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

    logout(): void {
        this.authenticatedUserStore.clear();
        this.applicationNavigator.navigateToLogin();
    }
}