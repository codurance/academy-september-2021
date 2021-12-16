import {Profile, ProfileSearchQuery} from "skillset";

export interface ProfileSearchState {
    query: ProfileSearchQuery;
    results: Profile[];
    timestamp: number;
}
