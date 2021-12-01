import {ProfileController} from "./ProfileController";
import {anything, capture, instance, mock, when} from "ts-mockito";
import {ProfileRepository} from "../repository/ProfileRepository";
import {ProfileSearchQueryParser} from "./ProfileSearchQueryParser";
import {Profile, ProfileSearchQuery} from "skillset";

describe('profile controller should', () => {

   const profileSearchQueryParser = new ProfileSearchQueryParser();
   const profileRepository = mock<ProfileRepository>()

   const profileController = new ProfileController(profileSearchQueryParser, instance(profileRepository));

   it('search with parsed query', async () => {
      const event = {
         queryStringParameters: {'skills[0]': 'React', 'skills[1]': 'Typescript', 'skills[2]': 'Serverless'}
      };
      when(profileRepository.search(anything())).thenReturn([]);

      await profileController.search(event);

      const capturedQuery: ProfileSearchQuery = capture(profileRepository.search).last()[0];
      expect(capturedQuery).toEqual({
         skills: ['React', 'Typescript', 'Serverless']
      });
   });

   test('return results for search query', async () => {
      const event = {
         queryStringParameters: {'skills[0]': 'React'}
      };
      const expectedProfiles: Profile[] = [
         {name: 'Person One'} as Profile
      ];
      when(profileRepository.search(anything())).thenReturn(expectedProfiles);

      const response = await profileController.search(event);

      expect(response.statusCode).toBe(200);
      expect(response.body).toBe('[{"name":"Person One"}]');
   });
});