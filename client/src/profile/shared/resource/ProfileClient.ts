import {Profile, ProfileSearchQuery} from "skillset";
import {AuthorisedResourceClient} from "./AuthorisedResourceClient";

export class ProfileClient {
    private requestClient: AuthorisedResourceClient;

    constructor(authorisedResourceClient: AuthorisedResourceClient) {
        this.requestClient = authorisedResourceClient;
    }

    public async search(query: ProfileSearchQuery): Promise<Profile[]> {
        return this.requestClient.get<Profile[]>('/profile/all', query);
    }
}