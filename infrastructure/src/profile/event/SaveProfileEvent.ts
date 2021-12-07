import {UpdatedProfile} from "skillset";

export interface SaveProfileEvent {
    body: UpdatedProfile;
    authorisedUser: string;
}