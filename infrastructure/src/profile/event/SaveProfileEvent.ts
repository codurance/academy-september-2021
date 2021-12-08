import {RequestContext} from "../../shared/RequestContext";

export interface SaveProfileEvent {
    body: string;
    requestContext: RequestContext;
}