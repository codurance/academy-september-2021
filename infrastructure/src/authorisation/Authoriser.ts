import {AuthorisedUser} from "../shared/AuthorisedUser";

export interface Authoriser {

    getAuthorisedUser(token: string): Promise<AuthorisedUser>

}