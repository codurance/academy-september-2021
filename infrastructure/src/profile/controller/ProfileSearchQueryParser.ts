import querystring from "qs";
import {ProfileSearchQuery} from "skillset";

export class ProfileSearchQueryParser {

    parse(parameters: any): ProfileSearchQuery {
        const queryParameters = querystring.parse(parameters);

        return  {
            skills: queryParameters.skills as string[]
        };
    }

}