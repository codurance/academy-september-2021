import { ApplicationNavigator } from ".";
import {NavigateFunction} from "react-router-dom";

export class ReactRouterNavigator implements ApplicationNavigator {

    public static readonly LOGIN_ROUTE = '/login';
    public static readonly HOME_ROUTE = '/';

    private readonly navigator: NavigateFunction;

    constructor(navigator: NavigateFunction) {
        this.navigator = navigator;
    }

    navigateToHome(): void {
        this.navigator(ReactRouterNavigator.HOME_ROUTE);
    }

    navigateToLogin(): void {
        this.navigator(ReactRouterNavigator.LOGIN_ROUTE);
    }

}