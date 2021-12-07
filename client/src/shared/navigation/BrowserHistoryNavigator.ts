import { ApplicationNavigator, FeatureRoute } from ".";
import { History } from "history";

export class BrowserHistoryNavigator implements ApplicationNavigator {

    private history: History;

    constructor(history: History) {
        this.history = history;
    }

    navigateToHome(): void {
        this.history.push(FeatureRoute.PROFILE);
    }

    navigateToLogin(): void {
        this.history.push(FeatureRoute.LOGIN);
    }

}