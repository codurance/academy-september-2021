import {ProfileFeatureNavigator} from "./ProfileFeatureNavigator";
import {Profile, ProfileSearchQuery} from "../domain";
import {History} from "history";

export class BrowserHistoryProfileFeatureNavigator implements ProfileFeatureNavigator {

    public static readonly PROFILE_SEARCH_RESULTS_ROUTE = '/results';

    private history: History;

    constructor(history: History) {
        this.history = history;
    }

    navigateToResults(query: ProfileSearchQuery, results: Profile[]): void {
        this.history.replace(
            BrowserHistoryProfileFeatureNavigator.PROFILE_SEARCH_RESULTS_ROUTE,
            {query, results}
        );
    }

}