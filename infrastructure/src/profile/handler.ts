import {Handler} from 'aws-lambda';
import {ProfileController} from "./controller/ProfileController";
import {ProfileSearchQueryParser} from "./controller/ProfileSearchQueryParser";
import {SearchProfilesEvent} from "./event/SearchProfilesEvent";
import {GetProfileEvent} from "./event/GetProfileEvent";
import {SaveProfileEvent} from "./event/SaveProfileEvent";
import {StaticProfileRepository} from "./repository/StaticProfileRepository";

//Switch this out for the proper implementation when ready
const profileRepository = new StaticProfileRepository();
const profileSearchQueryParser = new ProfileSearchQueryParser();
const profileController = new ProfileController(profileSearchQueryParser, profileRepository);

export const search: Handler = async (event: SearchProfilesEvent) => {
    return profileController.search(event);
};

export const get: Handler = async (event: GetProfileEvent) => {
    return profileController.get(event);
};

export const save: Handler = async (event: SaveProfileEvent) => {
    return profileController.save(event);
};