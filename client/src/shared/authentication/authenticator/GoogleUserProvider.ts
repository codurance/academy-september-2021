import { gapi } from "gapi-script";

export class GoogleUserProvider {

    public async getGoogleUser(): Promise<gapi.auth2.GoogleUser> {
        await this.loadGoogleAuthenticationLibrary();

        const auth = gapi.auth2.getAuthInstance();
        return auth.signIn();
    }

    private async loadGoogleAuthenticationLibrary() {
        const clientId = "203459804808-h52d919upt0fj3qo6l192b67imotjhfl.apps.googleusercontent.com";
        await new Promise((resolve) => gapi.load('client:auth2', resolve));
        await new Promise((resolve) => gapi.auth2.init({client_id: clientId}).then(resolve));
    }

}
