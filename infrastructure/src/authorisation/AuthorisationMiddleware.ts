import {Authoriser} from "./Authoriser";

export class AuthorisationMiddleware {

    private authoriser: Authoriser;

    constructor(authoriser: Authoriser) {
        this.authoriser = authoriser;
    }

    public async generatePolicy(event: any) {
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