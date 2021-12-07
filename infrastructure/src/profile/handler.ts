import {Handler} from 'aws-lambda';
import {ProfileController} from "./controller/ProfileController";
import {StaticProfileRepository} from "./repository/StaticProfileRepository";
import {ProfileSearchQueryParser} from "./controller/ProfileSearchQueryParser";
import {SearchProfilesEvent} from "./event/SearchProfilesEvent";
import {GetProfileEvent} from "./event/GetProfileEvent";

const profileSearchQueryParser = new ProfileSearchQueryParser();
const profileRepository = new StaticProfileRepository();
const profileController = new ProfileController(profileSearchQueryParser, profileRepository);

export const search: Handler = async (event: SearchProfilesEvent) => {
    return profileController.search(event);
};

export const get: Handler = async (event: GetProfileEvent) => {
    return profileController.get(event);
};