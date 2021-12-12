import React from "react";
import {Login} from "./Login";
import {AuthenticatedUserService} from "../shared/authentication/service/AuthenticatedUserService";

type Props = {
    userService: AuthenticatedUserService;
};

export const LoginModule: React.FC<Props> = ({userService}: Props) => {
    return <Login userService={userService}/>;
};