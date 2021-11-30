import { ApplicationNavigator } from ".";
import { History } from "history";

export class BrowserHistoryNavigator implements ApplicationNavigator {

    public static readonly LOGIN_ROUTE = '/login';
    public static readonly HOME_ROUTE = '/';

    private history: History;

    constructor(history: History) {
        this.history = history;
    }

    navigateToHome(): void {
        this.history.push(BrowserHistoryNavigator.HOME_ROUTE);
    }

    navigateToLogin(): void {
        this.history.push(BrowserHistoryNavigator.LOGIN_ROUTE);
    }

}