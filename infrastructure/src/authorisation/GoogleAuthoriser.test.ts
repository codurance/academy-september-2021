import {LoginTicket, OAuth2Client, TokenPayload} from "google-auth-library";
import {anything, capture, instance, mock, when} from "ts-mockito";
import {GoogleAuthoriser} from "./GoogleAuthoriser";

describe('google authoriser should', () => {
    const client = mock<OAuth2Client>();

    const googleAuthoriser = new GoogleAuthoriser(
        instance(client)
    );

    it('get authorised user with id token', async () => {
        withTokenPayloadResponse();

        await googleAuthoriser.getAuthorisedUser('access-token');

        expect(capture(client.verifyIdToken).last()).toEqual([{idToken: 'access-token'}]);
    });

    test('get authorised user from id token', async () => {
        withTokenPayloadResponse();

        const user = await googleAuthoriser.getAuthorisedUser('access-token');

        expect(user).toEqual({
            name: 'Best User',
            email: 'best.user@codurance.com',
            profileImageUrl: 'https://www.google.com/best.user/image.png'
        });
    });

    it('throw error when unable to get token payload', async () => {
        const response = {
            getPayload(): TokenPayload | undefined {
                return undefined;
            }
        } as LoginTicket;
        when(client.verifyIdToken(anything())).thenResolve(response);

        await expect(googleAuthoriser.getAuthorisedUser('access-token'))
            .rejects
            .toThrow('Unable to verify Google id token');
    });

    const withTokenPayloadResponse = () => {
        const response = {
            getPayload(): TokenPayload | undefined {
                return {
                    name: 'Best User',
                    email: 'best.user@codurance.com',
                    picture: 'https://www.google.com/best.user/image.png'
                } as TokenPayload;
            }
        } as LoginTicket;
        when(client.verifyIdToken(anything())).thenResolve(response);
    };
});