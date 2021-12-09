import {ProfileFeatureNavigator, ProfileFeatureRoute} from ".";
import {Profile, ProfileSearchQuery} from "skillset";
import {History} from "history";

export class BrowserHistoryProfileFeatureNavigator implements ProfileFeatureNavigator {

    private history: History;

    constructor(history: History) {
        this.history = history;
    }

    navigateToResults(query: ProfileSearchQuery, results: Profile[]): void {
        this.history.push(
            ProfileFeatureRoute.RESULTS,
            {query, results}
        );
    }

    navigateToProfile(): void {
        this.history.push(ProfileFeatureRoute.PROFILE);
    }

    navigateToSearch(): void {
        this.history.push(ProfileFeatureRoute.SEARCH);
    }
}