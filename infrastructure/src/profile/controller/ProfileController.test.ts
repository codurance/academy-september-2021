import {ProfileController} from "./ProfileController";
import {anything, capture, instance, mock, when} from "ts-mockito";
import {ProfileRepository} from "../repository/ProfileRepository";
import {ProfileSearchQueryParser} from "./ProfileSearchQueryParser";
import {Profile, ProfileSearchQuery} from "skillset";

describe('profile controller should', () => {
    const profileSearchQueryParser = new ProfileSearchQueryParser();
    const profileRepository = mock<ProfileRepository>();

    const profileController = new ProfileController(profileSearchQueryParser, instance(profileRepository));

    it('search with parsed query', async () => {
        const event = {
            queryStringParameters: {'skills[0]': 'React', 'skills[1]': 'Typescript', 'skills[2]': 'Serverless', 'hasRequestedAvailableOnly': 'true'}
        };
        when(profileRepository.search(anything())).thenResolve([]);

        await profileController.search(event);

        const capturedQuery: ProfileSearchQuery = capture(profileRepository.search).last()[0];
        expect(capturedQuery).toEqual({
            skills: ['React', 'Typescript', 'Serverless'],
            hasRequestedAvailableOnly: true
        });
    });

    test('return results for search query', async () => {
        const event = {
            queryStringParameters: {'skills[0]': 'React'}
        };
        const expectedProfiles: Profile[] = [
            {name: 'Person One'} as Profile
        ];
        when(profileRepository.search(anything())).thenResolve(expectedProfiles);

        const response = await profileController.search(event);

        expect(response).toEqual({
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            body: '[{"name":"Person One"}]'
        });
    });

    test('return requested profile', async () => {
        const event = {
            pathParameters: {'email': 'jordan.bambury@codurance.com'}
        };
        const persistedProfile = {name: 'Jordan Bambury'} as Profile;
        when(profileRepository.get('jordan.bambury@codurance.com')).thenResolve(persistedProfile);

        const response = await profileController.get(event);

        expect((response)).toEqual({
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            body: '{"name":"Jordan Bambury"}'
        });
    });

    test('save updated profile', async () => {
        const event = {
            body: '{"skills": [{"name": "React", "level": 5}]}',
            requestContext: {
                authorizer: {
                    authorisedUser: '{"name":"Best User","email":"best.user@codurance.com","profileImageUrl":"http://codurance.com/best-user/profile-image.png"}',
                }
            }
        };

        await profileController.save(event);

        const updatedProfile = capture(profileRepository.save).last()[0];
        expect(updatedProfile).toEqual({
            email: "best.user@codurance.com",
            name: "Best User",
            imageUrl: "http://codurance.com/best-user/profile-image.png",
            skills: [{name: 'React', level: 5}],
            currentClient: 'Fake Client',
            isAvailable: true,
            role: 'Fake Role'
        });
    });

    test('return success response after updating profile', async () => {
        const event = {
            body: '{"skills": [{"name": "React", "level": 5}]}',
            requestContext: {
                authorizer: {
                    authorisedUser: '{"name":"Best User","email":"best.user@codurance.com","profileImageUrl":"http://codurance.com/best-user/profile-image.png"}',
                }
            }
        };
        when(profileRepository.save(anything())).thenResolve();

        const response = await profileController.save(event);

        expect((response)).toEqual({
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            body: ''
        });
    });
});