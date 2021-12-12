import {Authenticator} from "../authenticator";
import {AuthenticatedUser, AuthenticatedUserStore} from "../persistence";
import {ApplicationNavigator} from "../../navigation";

export class AuthenticatedUserService {

    private authenticator: Authenticator;
    private authenticatedUserStore: AuthenticatedUserStore;
    private applicationNavigator: ApplicationNavigator;

    constructor(authenticator: Authenticator, authenticatedUserStore: AuthenticatedUserStore, applicationNavigator: ApplicationNavigator) {
        this.authenticator = authenticator;
        this.authenticatedUserStore = authenticatedUserStore;
        this.applicationNavigator = applicationNavigator;
    }

    public getAuthenticatedUser(): AuthenticatedUser | undefined {
        return this.authenticatedUserStore.get();
    }

    public hasValidSession(): boolean {
        const authenticatedUser = this.getAuthenticatedUser();
        const accessToken = authenticatedUser?.accessToken;
        if (!accessToken) return false;

        return this.authenticator.isValidToken(accessToken);
    }

    public async login(): Promise<void> {
        const authenticatedUser = await this.authenticator.getAuthenticatedUser();
        this.authenticatedUserStore.set(authenticatedUser);
        this.applicationNavigator.navigateToHome();
    }

    public logout(): void {
        this.authenticatedUserStore.clear();
        this.applicationNavigator.navigateToLogin();
    }
    
}