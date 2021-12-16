import {capture, instance, mock, when} from "ts-mockito";
import {ProfileSearchService} from "./ProfileSearchService";
import {ProfileFeatureNavigator} from "../../navigation";
import {ProfileClient} from "../../resource";
import {Profile, ProfileSearchQuery} from "skillset";

describe('profile search service', () => {
    const profileFeatureNavigator = mock<ProfileFeatureNavigator>();
    const profileClient = mock(ProfileClient);

    const profileSearchService = new ProfileSearchService(
        instance(profileClient), instance(profileFeatureNavigator)
    );


    it('should navigate to results page with profile search result', async () => {
        const query = {skills: ['Java']} as ProfileSearchQuery;
        const results = [{name: 'Jordan Steele'} as Profile, {name: 'Sam Colgan'} as Profile];
        when(profileClient.search(query)).thenResolve(results);

        await profileSearchService.search(query);

        const capturedSearch = capture(profileFeatureNavigator.navigateToResults).last()[0];
        expect(capturedSearch.query).toEqual(query);
        expect(capturedSearch.results).toEqual(results);
        expectRecentTimestampCreated(capturedSearch.timestamp);
    });

    const expectRecentTimestampCreated = (timestamp: number) => {
        const date = new Date(timestamp);
        const now = new Date();
        expect(date.getUTCFullYear()).toEqual(now.getUTCFullYear());
        expect(date.getUTCMonth()).toEqual(now.getUTCMonth());
        expect(date.getUTCDay()).toEqual(now.getUTCDay());
        expect(date.getUTCHours()).toEqual(now.getUTCHours());
        expect(date.getUTCMinutes()).toEqual(now.getUTCMinutes());
    };
});