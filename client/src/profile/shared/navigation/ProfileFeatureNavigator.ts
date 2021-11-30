import {Profile} from "../domain/Profile";
import {ProfileSearchQuery} from "../domain/ProfileSearchQuery";

export interface ProfileFeatureNavigator {

    navigateToResults(query: ProfileSearchQuery, results: Profile[]): void;

}