import {AuthorisedUser} from "../shared/AuthorisedUser";

export class ProfileController {

    async search(event: any) {
        const authorisedUser = event.requestContext.authorizer.authorisedUser as AuthorisedUser;
        const profile = {
            name: authorisedUser.name,
            email: authorisedUser.email
        };

        return {
            statusCode: 200,
            body: JSON.stringify(profile)
        }
    }

}