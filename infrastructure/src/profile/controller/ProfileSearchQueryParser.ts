import querystring from "qs";
import {ProfileSearchQuery} from "skillset";

export class ProfileSearchQueryParser {

    parse(parameters: any): ProfileSearchQuery { // eslint-disable-line @typescript-eslint/no-explicit-any
        const queryParameters = querystring.parse(parameters);

        return  {
            skills: queryParameters.skills as string[],
            isAvailable: Boolean(queryParameters.isAvailable) as boolean
        };
    }

}