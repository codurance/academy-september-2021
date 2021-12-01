import {Handler} from 'aws-lambda';
import {ProfileController} from "./controller/ProfileController";
import {StaticProfileRepository} from "./repository/StaticProfileRepository";
import {ProfileSearchQueryParser} from "./controller/ProfileSearchQueryParser";
import {SearchProfilesEvent} from "./event/SearchProfilesEvent";

const profileSearchQueryParser = new ProfileSearchQueryParser();
const profileRepository = new StaticProfileRepository();
const profileController = new ProfileController(profileSearchQueryParser, profileRepository);

export const search: Handler = async (event: SearchProfilesEvent) => {
    return profileController.search(event);
};