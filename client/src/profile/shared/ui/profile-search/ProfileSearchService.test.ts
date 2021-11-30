import {instance, mock, verify, when} from "ts-mockito";
import {ProfileSearchService} from "./ProfileSearchService";
import {ProfileFeatureNavigator} from "../../navigation";
import {ProfileClient} from "../../resource";

describe('profile search service', () => {
    const profileFeatureNavigator = mock<ProfileFeatureNavigator>();
    const profileClient = mock(ProfileClient);

    const profileSearchService = new ProfileSearchService(
        instance(profileClient), instance(profileFeatureNavigator)
    );

    it('should navigate to results page with profile search result', async () => {
        const query = {skills: ['Java']};
        const result = [{name: 'Jordan Steele'}, {name: 'Sam Colgan'}];
        when(profileClient.search(query)).thenResolve(result);

        await profileSearchService.search(query);

        verify(profileFeatureNavigator.navigateToResults(query, result)).called();
    });
});