import {AuthorisationMiddleware} from "./AuthorisationMiddleware";
import {instance, mock, when} from "ts-mockito";
import {Authoriser} from "./Authoriser";
import {AuthorisedUser} from "../shared/AuthorisedUser";

describe('authorisation middleware should', () => {

    const authoriser = mock<Authoriser>();

    const authorisationMiddleware = new AuthorisationMiddleware(
        instance(authoriser)
    );

    test('generate allow policy for authorised users', async () => {
        const event = {
            authorizationToken: 'Bearer access-token'
        };
        const authorisedUser: AuthorisedUser = {
            name: 'Best User',
            email: "best.user@codurance.com",
            profileImageUrl: "http://codurance.com/best-user/profile-image.png"
        };
        when(authoriser.getAuthorisedUser('access-token')).thenResolve(authorisedUser);

        const policy = await authorisationMiddleware.generatePolicy(event);

        expect(policy).toEqual({
            principalId: 'user',
            policyDocument: {
                Statement: [
                    {
                        Action: 'execute-api:Invoke',
                        Effect: 'Allow',
                        Resource: '*'
                    }
                ]
            },
            context: {
                authorisedUser: {
                    name: 'Best User',
                    email: "best.user@codurance.com",
                    profileImageUrl: "http://codurance.com/best-user/profile-image.png",
                    domain: 'codurance.com'
                }
            }
        });
    });
});