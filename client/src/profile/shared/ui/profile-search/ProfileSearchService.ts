import {ProfileFeatureNavigator} from "../../navigation";
import {ProfileClient} from "../../resource";
import {ProfileSearchQuery} from "skillset";

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