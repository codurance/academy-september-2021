import {ProfileFeatureNavigator, ProfileFeatureRoute} from ".";
import {History} from "history";
import {ProfileSearchState} from "../ui/profile-search/ProfileSearchState";

export class BrowserHistoryProfileFeatureNavigator implements ProfileFeatureNavigator {

    private history: History;

    constructor(history: History) {
        this.history = history;
    }

    navigateToResults(state: ProfileSearchState): void {
        this.history.push(
            ProfileFeatureRoute.RESULTS,
            {...state}
        );
    }

    navigateToProfile(): void {
        this.history.push(ProfileFeatureRoute.PROFILE);
    }

    navigateToSearch(): void {
        this.history.push(ProfileFeatureRoute.SEARCH);
    }
}