import {Authoriser} from "./Authoriser";
import {AuthoriseEvent} from "./AuthoriseEvent";

export class AuthorisationMiddleware {

    private authoriser: Authoriser;

    constructor(authoriser: Authoriser) {
        this.authoriser = authoriser;
    }

    public async generatePolicy(event: AuthoriseEvent) {
        const token = event.authorizationToken.split('Bearer ')[1];
        const authorisedUser = await this.authoriser.getAuthorisedUser(token);

        return {
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
                authorisedUser
            }
        };
    }

}