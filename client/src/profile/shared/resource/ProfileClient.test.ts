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

    it('get profile by email', async () => {
        const profile: Profile = {name: 'Simon Spielberg'} as Profile;
        when(authorisedResourceClient.get('/profile/simon.spielbery@codurance.com')).thenResolve(profile);

        const result = await profileClient.getProfile('simon.spielbery@codurance.com');

        expect(result).toBe(profile);
    });
});