import {AuthenticatedUserStore} from "../authentication/persistence";
import {Navigate} from "react-router-dom";
import {ReactRouterNavigator} from "./ReactRouterNavigator";
import {Authenticator} from "../authentication/authenticator";

type Props = {
    authenticatedUserStore: AuthenticatedUserStore;
    authenticator: Authenticator;
    children: JSX.Element;
}

export const AuthenticatedRouteGuard = ({authenticatedUserStore, authenticator, children }: Props) => {

    const authenticatedUser = authenticatedUserStore.get();
    const accessToken = authenticatedUser?.accessToken;

    if(accessToken && authenticator.isValidToken(accessToken)) return children;

    return <Navigate to={ReactRouterNavigator.LOGIN_ROUTE} />
};