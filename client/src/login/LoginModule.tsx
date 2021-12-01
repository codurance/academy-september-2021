import {Authenticator} from "../shared/authentication/authenticator";
import {AuthenticatedUserStore} from "../shared/authentication/persistence";
import {ApplicationNavigator} from "../shared/navigation";
import React from "react";
import {Login} from "./Login";
import {LoginService} from "./LoginService";

type Props = {
    authenticator: Authenticator;
    authenticatedUserStore: AuthenticatedUserStore;
    applicationNavigator: ApplicationNavigator;
};

export const LoginModule = ({authenticator, authenticatedUserStore, applicationNavigator}: Props) => {
    const loginService = new LoginService(authenticator, authenticatedUserStore, applicationNavigator);

    return <Login loginService={loginService}/>;
};