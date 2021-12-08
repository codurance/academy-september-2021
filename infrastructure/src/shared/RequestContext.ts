export interface RequestContext {
    authorizer: AuthorizerContext
}

interface AuthorizerContext {
    authorisedUser: string;
}