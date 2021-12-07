import {Profile, ProfileSearchQuery} from "skillset";

export interface ProfileRepository {

    search(query: ProfileSearchQuery): Promise<Profile[]>;

    get(email: string): Promise<Profile | undefined>;

    save(profile: Profile): Promise<void>;
}