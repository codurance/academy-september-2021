import {Profile, UpdatedProfile} from "skillset";
import {ProfileSearchQueryParser} from "./ProfileSearchQueryParser";
import {ProfileRepository} from "../repository/ProfileRepository";
import {Response} from "./Response";
import {SearchProfilesEvent} from "../event/SearchProfilesEvent";
import {GetProfileEvent} from "../event/GetProfileEvent";
import {SaveProfileEvent} from "../event/SaveProfileEvent";
import {AuthorisedUser} from "../../shared/AuthorisedUser";

export class ProfileController {

    private profileSearchQueryParser: ProfileSearchQueryParser;
    private profileRepository: ProfileRepository;

    constructor(profileSearchQueryParser: ProfileSearchQueryParser, profileRepository: ProfileRepository) {
        this.profileSearchQueryParser = profileSearchQueryParser;
        this.profileRepository = profileRepository;
    }

    async search(event: SearchProfilesEvent): Promise<Response> {
        const queryStringParameters = event.queryStringParameters;
        const query = this.profileSearchQueryParser.parse(queryStringParameters);
        const result: Profile[] = await this.profileRepository.search(query);

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(result)
        };
    }

    async get(event: GetProfileEvent): Promise<Response> {
        const email = event.pathParameters.email;
        const profile = await this.profileRepository.get(email);

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(profile)
        };
    }

    async save(event: SaveProfileEvent): Promise<Response> {
        const authorisedUser = JSON.parse(event.requestContext.authorizer.authorisedUser) as AuthorisedUser;
        const updatedProfile = JSON.parse(event.body) as UpdatedProfile;
        const profile: Profile = {
            email: authorisedUser.email,
            name: authorisedUser.name,
            imageUrl: authorisedUser.profileImageUrl,
            ...updatedProfile,
            role: 'Software Craftsperson in Training'
        };

        await this.profileRepository.save(profile);

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            body: ''
        };
    }
}