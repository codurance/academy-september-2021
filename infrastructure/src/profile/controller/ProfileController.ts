import {Profile} from "skillset";
import {ProfileSearchQueryParser} from "./ProfileSearchQueryParser";
import {ProfileRepository} from "../repository/ProfileRepository";
import {Response} from "./Response";
import {SearchProfilesEvent} from "../event/SearchProfilesEvent";

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
        const result: Profile[] = this.profileRepository.search(query);

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(result)
        };
    }

}