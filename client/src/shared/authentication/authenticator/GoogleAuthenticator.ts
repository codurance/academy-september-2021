import {Authenticator, GoogleUserProvider} from '.';
import jwtDecode, {JwtPayload} from "jwt-decode";
import {AuthenticatedUser} from "../persistence";

export class GoogleAuthenticator implements Authenticator {

    private userProvider: GoogleUserProvider;

    constructor(userProvider: GoogleUserProvider) {
        this.userProvider = userProvider;
    }

    isValidToken(token: string): boolean {
        try {
            const decodedToken = jwtDecode<JwtPayload>(token);
            const tokenExpiry = decodedToken.exp;
            if (!tokenExpiry) return false;

            return (tokenExpiry * 1000) > Date.now();
        } catch (e) {
            return false;
        }
    }

    public async getAuthenticatedUser(): Promise<AuthenticatedUser> {
        const googleUser = await this.userProvider.getGoogleUser();

        const authResponse = googleUser.getAuthResponse();
        const userProfile = googleUser.getBasicProfile();

        return {
            name: userProfile.getName(),
            accessToken: authResponse.id_token,
            email: userProfile.getEmail(),
            profileImageUrl: userProfile.getImageUrl(),
        }
    }

}