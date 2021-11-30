import {ProfileFeatureNavigator} from "../../navigation/ProfileFeatureNavigator";
import {ProfileClient} from "../../resource/ProfileClient";
import {ProfileSearchQuery} from "../../domain/ProfileSearchQuery";

export class ProfileSearchService {

    private profileFeatureNavigator: ProfileFeatureNavigator;
    private profileClient: ProfileClient;

    constructor(profileClient: ProfileClient, profileFeatureNavigator: ProfileFeatureNavigator) {
        this.profileClient = profileClient;
        this.profileFeatureNavigator = profileFeatureNavigator;
    }

    public async search(query: ProfileSearchQuery): Promise<void> {
        const result = await this.profileClient.search(query);
        this.profileFeatureNavigator.navigateToResults(query, result);
    }

}