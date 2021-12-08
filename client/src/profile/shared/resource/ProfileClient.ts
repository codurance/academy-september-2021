import {Profile, ProfileSearchQuery, UpdatedProfile} from "skillset";
import {AuthorisedResourceClient} from "./AuthorisedResourceClient";

export class ProfileClient {
    private resourceClient: AuthorisedResourceClient;

    constructor(authorisedResourceClient: AuthorisedResourceClient) {
        this.resourceClient = authorisedResourceClient;
    }

    public async search(query: ProfileSearchQuery): Promise<Profile[]> {
        return this.resourceClient.get<Profile[]>('/profile/all', query);
    }

    public async getProfile(email: string): Promise<Profile | undefined> {
        return this.resourceClient.get<Profile | undefined>(`/profile/${email}`);
    }

    public async save(profile: UpdatedProfile): Promise<void> {
        await this.resourceClient.update<UpdatedProfile>('/profile', profile);
    }
}