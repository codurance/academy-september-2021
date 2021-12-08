import {Profile, ProfileSearchQuery, UpdatedProfile} from "skillset";
import {ResourceClient} from "./ResourceClient";

export class ProfileClient {
    private resourceClient: ResourceClient;

    constructor(resourceClient: ResourceClient) {
        this.resourceClient = resourceClient;
    }

    public async search(query: ProfileSearchQuery): Promise<Profile[]> {
        return this.resourceClient.get<Profile[]>('/profile/all', query);
    }

    public async getProfile(email: string): Promise<Profile | undefined> {
        return this.resourceClient.get<Profile | undefined>(`/profile/${email}`);
    }

    public async save(profile: UpdatedProfile): Promise<void> {
        return this.resourceClient.update<UpdatedProfile>('/profile', profile);
    }
}