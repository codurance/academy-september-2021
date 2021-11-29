import {Handler} from 'aws-lambda';
import {ProfileController} from "./ProfileController";

const profileController = new ProfileController();

export const search: Handler = async (event: any) => {
    return profileController.search(event);
};