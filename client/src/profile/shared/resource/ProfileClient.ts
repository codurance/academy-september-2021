import {Profile} from "../domain/Profile";
import {AuthorisedResourceClient} from "./AuthorisedResourceClient";
import {ProfileSearchQuery} from "../domain/ProfileSearchQuery";

export class ProfileClient {
    private requestClient: AuthorisedResourceClient;

    constructor(authorisedResourceClient: AuthorisedResourceClient) {
        this.requestClient = authorisedResourceClient;
    }

    public async search(query: ProfileSearchQuery): Promise<Profile[]> {
        return this.requestClient.get<Profile[]>('/profile/all', query);
    }
}