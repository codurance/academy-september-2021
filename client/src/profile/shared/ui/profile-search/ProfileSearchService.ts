import {ProfileFeatureNavigator} from "../../navigation";
import {ProfileClient} from "../../resource";
import {ProfileSearchQuery} from "skillset";
import {DateProvider} from "./DateProvider";

export class ProfileSearchService {

    private profileFeatureNavigator: ProfileFeatureNavigator;
    private profileClient: ProfileClient;
    private dateProvider: DateProvider;

    constructor(profileClient: ProfileClient, profileFeatureNavigator: ProfileFeatureNavigator, dateProvider: DateProvider) {
        this.profileClient = profileClient;
        this.profileFeatureNavigator = profileFeatureNavigator;
        this.dateProvider = dateProvider;
    }

    public async search(query: ProfileSearchQuery): Promise<void> {
        const results = await this.profileClient.search(query);
        const now = this.dateProvider.currentTimestamp();
        const state = {
            query,
            results,
            timestamp: now
        };
        this.profileFeatureNavigator.navigateToResults(state);
    }

}