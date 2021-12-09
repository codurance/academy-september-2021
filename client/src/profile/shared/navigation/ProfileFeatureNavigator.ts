import {Profile, ProfileSearchQuery} from "skillset";

export interface ProfileFeatureNavigator {

    navigateToResults(query: ProfileSearchQuery, results: Profile[]): void;

    navigateToProfile(): void;

    navigateToSearch(): void;
}