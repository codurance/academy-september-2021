import {Profile, ProfileSearchQuery} from "../domain";

export interface ProfileFeatureNavigator {

    navigateToResults(query: ProfileSearchQuery, results: Profile[]): void;

}