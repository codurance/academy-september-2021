import {Handler} from 'aws-lambda';
import {AuthorisationMiddleware} from "./AuthorisationMiddleware";
import {OAuth2Client} from "google-auth-library";
import {GoogleAuthoriser} from "./GoogleAuthoriser";


const clientId = "203459804808-h52d919upt0fj3qo6l192b67imotjhfl.apps.googleusercontent.com";
const client = new OAuth2Client(clientId);
const authoriser = new GoogleAuthoriser(client);
const authorisationMiddleware = new AuthorisationMiddleware(authoriser);

export const authorise: Handler = async (event: any) => {
    return authorisationMiddleware.generatePolicy(event);
};