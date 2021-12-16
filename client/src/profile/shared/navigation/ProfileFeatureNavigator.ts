import {ProfileSearchState} from "../ui/profile-search/ProfileSearchState";

export interface ProfileFeatureNavigator {

    navigateToResults(state: ProfileSearchState): void;

    navigateToProfile(): void;

    navigateToSearch(): void;
}