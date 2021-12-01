import jwt from "jsonwebtoken";
import {GoogleAuthenticator, GoogleUserProvider} from '.';
import {AuthenticatedUser} from "../persistence";
import {instance, mock, when} from "ts-mockito";

jest.mock('gapi-script', () => ({
    gapi: jest.fn()
}));

describe('GoogleAuthenticator', () => {

    const googleUserProvider = mock(GoogleUserProvider);

    const googleAuthenticator = new GoogleAuthenticator(
        instance(googleUserProvider)
    );

    it("accept token validation when has not expired", () => {
        const aliveToken = jwt.sign({data: 'foobar'}, 'secret', {expiresIn: '1m'});

        expect(googleAuthenticator.isValidToken(aliveToken)).toBeTruthy();
    });

    it("reject token validation when token has expired", () => {
        const expiredToken = jwt.sign({data: 'foobar'}, 'secret', {expiresIn: '-1s'});

        expect(googleAuthenticator.isValidToken(expiredToken)).toBeFalsy();
    });

    it('reject token validation when token has no expiry provided', () => {
        const corruptedToken = 'not-a-jwt-token';

        expect(googleAuthenticator.isValidToken(corruptedToken)).toBeFalsy();
    });

    it('should get the authenticated user', async () => {
        const googleUser: gapi.auth2.GoogleUser = getGoogleUserInstance();
        when(googleUserProvider.getGoogleUser()).thenResolve(googleUser);

        const authenticatedUser = await googleAuthenticator.getAuthenticatedUser();

        const expectedAuthenticatedUser: AuthenticatedUser = {
            name: "Full Name",
            accessToken: "google-id-token",
            email: "best.user@codurance.com",
            profileImageUrl: "https://google.com/profile/best-user-image.png"
        };
        expect(authenticatedUser).toEqual(expectedAuthenticatedUser);
    });

    const getGoogleUserInstance = () => ({
            getAuthResponse(): gapi.auth2.AuthResponse {
                return {
                    id_token: "google-id-token"
                } as gapi.auth2.AuthResponse;
            },
            getBasicProfile(): gapi.auth2.BasicProfile {
                return {
                    getName(): string {
                        return "Full Name";
                    },
                    getEmail(): string {
                        return "best.user@codurance.com";
                    },
                    getImageUrl(): string {
                        return 'https://google.com/profile/best-user-image.png';
                    }
                } as gapi.auth2.BasicProfile;
            }
        } as gapi.auth2.GoogleUser
    );
});

