import {OAuth2Client} from "google-auth-library";
import {Authoriser} from "./Authoriser";
import {AuthorisedUser} from "../shared/AuthorisedUser";

export class GoogleAuthoriser implements Authoriser {

    private googleClient: OAuth2Client;

    constructor(googleClient: OAuth2Client) {
        this.googleClient = googleClient;
    }

    async getAuthorisedUser(token: string): Promise<AuthorisedUser> {
        const tokenVerification = await this.googleClient.verifyIdToken({
            idToken: token
        });
        const payload = tokenVerification.getPayload();
        if (!payload) throw Error('Unable to verify Google id token');

        /* eslint-disable @typescript-eslint/no-non-null-assertion */
        return {
            name: payload.name!,
            email: payload.email!,
            profileImageUrl: payload.picture!
        };
        /* eslint-enable @typescript-eslint/no-non-null-assertion */
    }

}