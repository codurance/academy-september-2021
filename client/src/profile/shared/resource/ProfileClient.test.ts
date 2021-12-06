import {instance, mock, when} from "ts-mockito";
import {ProfileClient} from "./ProfileClient";
import {AuthorisedResourceClient} from "./AuthorisedResourceClient";
import {Profile} from "skillset";

describe('profile client should', () => {
    const authorisedResourceClient = mock<AuthorisedResourceClient>();

    const profileClient = new ProfileClient(
        instance(authorisedResourceClient)
    );

    it('perform get request on search', async () => {
        const query = {skills: ['React']};
        const results: Profile[] = [{name: 'Jordan Steele'} as Profile, {name: 'Sam Colgan'} as Profile];
        when(authorisedResourceClient.get('/profile/all', query)).thenResolve(results);

        const searchResults = await profileClient.search(query);

        expect(searchResults).toEqual(results);
    });

    it('get saved profile', async () => {
        const profile: Profile = {name: 'Simon Spielberg'} as Profile;
        when(authorisedResourceClient.get('/profile')).thenResolve(profile);

        const result = await profileClient.getSavedProfile();

        expect(result).toBe(profile);
    });
});