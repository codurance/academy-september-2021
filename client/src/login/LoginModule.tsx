import React from "react";
import {Login} from "./Login";
import {UserService} from "../shared/user/service/UserService";

type Props = {
    userService: UserService;
};

export const LoginModule: React.FC<Props> = ({userService}: Props) => {
    return <Login userService={userService}/>;
};