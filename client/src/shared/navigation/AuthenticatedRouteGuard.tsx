import {Navigate} from "react-router-dom";
import React from "react";
import {FeatureRoute} from "./FeatureRoute";
import {AuthenticatedUserService} from "../authentication/service/AuthenticatedUserService";

type Props = {
    authenticatedUserService: AuthenticatedUserService;
    children: JSX.Element;
};

export const AuthenticatedRouteGuard: React.FC<Props> = ({authenticatedUserService, children}: Props) => {
    if (authenticatedUserService.hasValidSession()) return children;

    return <Navigate to={FeatureRoute.LOGIN}/>;
};