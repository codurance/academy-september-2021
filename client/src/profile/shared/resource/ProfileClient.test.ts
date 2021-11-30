import {instance, mock, when} from "ts-mockito";
import {ProfileClient} from "./ProfileClient";
import {AuthorisedResourceClient} from "../../../shared/resource/AuthorisedResourceClient";
import {Profile} from "../domain/Profile";

describe('ProfileRequestClient', () => {
    const authorisedResourceClient = mock<AuthorisedResourceClient>();

    const profileRequestClient = new ProfileClient(
        instance(authorisedResourceClient)
    );

    it('should perform get request on search', async () => {
        const query = {skills: ['React']};
        const results: Profile[] = [{name: 'Jordan Steele'}, {name: 'Sam Colgan'}];
        when(authorisedResourceClient.get('/profile/all', query)).thenResolve(results);

        const searchResults = await profileRequestClient.search(query);

        expect(searchResults).toEqual(results);
    });
})