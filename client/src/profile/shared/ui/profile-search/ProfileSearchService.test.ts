import {capture, instance, mock, when} from "ts-mockito";
import {ProfileSearchService} from "./ProfileSearchService";
import {ProfileFeatureNavigator} from "../../navigation";
import {ProfileClient} from "../../resource";
import {Profile, ProfileSearchQuery} from "skillset";
import {DateProvider} from "./DateProvider";

describe('profile search service', () => {
    const profileFeatureNavigator = mock<ProfileFeatureNavigator>();
    const profileClient = mock(ProfileClient);
    const dateProvider = mock(DateProvider);

    const profileSearchService = new ProfileSearchService(
        instance(profileClient),
        instance(profileFeatureNavigator),
        instance(dateProvider)
    );

    it('should navigate to results page with profile search result', async () => {
        const query = {skills: ['Java']} as ProfileSearchQuery;
        const results = [{name: 'Jordan Steele'} as Profile, {name: 'Sam Colgan'} as Profile];
        const now = Date.now();
        when(profileClient.search(query)).thenResolve(results);
        when(dateProvider.currentTimestamp()).thenReturn(now);

        await profileSearchService.search(query);

        const capturedSearch = capture(profileFeatureNavigator.navigateToResults).last()[0];
        expect(capturedSearch.query).toEqual(query);
        expect(capturedSearch.results).toEqual(results);
        expect(capturedSearch.timestamp).toEqual(now);
    });
});