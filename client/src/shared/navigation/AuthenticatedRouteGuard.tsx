import {AuthenticatedUserStore} from "../authentication/persistence";
import {Navigate} from "react-router-dom";
import {BrowserHistoryNavigator} from "./BrowserHistoryNavigator";
import {Authenticator} from "../authentication/authenticator";
import React from "react";

type Props = {
    authenticatedUserStore: AuthenticatedUserStore;
    authenticator: Authenticator;
    children: JSX.Element;
};

export const AuthenticatedRouteGuard: React.FC<Props> = ({authenticatedUserStore, authenticator, children }: Props) => {
    const authenticatedUser = authenticatedUserStore.get();
    const accessToken = authenticatedUser?.accessToken;

    if(accessToken && authenticator.isValidToken(accessToken)) return children;

    return <Navigate to={BrowserHistoryNavigator.LOGIN_ROUTE} />;
};