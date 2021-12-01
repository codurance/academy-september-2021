import {Profile, ProfileSearchQuery} from "skillset";

export interface ProfileRepository {

    search(query: ProfileSearchQuery): Profile[];

}