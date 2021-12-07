import {BrowserHistoryProfileFeatureNavigator, ProfileFeatureRoute} from "./shared/navigation";
import {ProfileSearchService} from "./shared/ui/profile-search";
import {History} from "history";
import {ApplicationNavigator, AuthenticatedRouteGuard} from "../shared/navigation";
import {ProfileSearchLanding} from "./search/ProfileSearchLanding";
import {ProfileSearchResults} from "./results/ProfileSearchResults";
import React from "react";
import {Authenticator} from "../shared/authentication/authenticator";
import {AuthenticatedUserStore} from "../shared/authentication/persistence";
import {Route, Routes} from "react-router-dom";
import {AxiosAuthorisedResourceClient, ProfileClient} from "./shared/resource";
import {Layout} from "./shared/ui/layout/Layout";
import {ProfileEdit} from "./edit/ProfileEdit";

type Props = {
    history: History;
    authenticator: Authenticator;
    authenticatedUserStore: AuthenticatedUserStore;
    applicationNavigator: ApplicationNavigator;
};

export const ProfileModule: React.FC<Props> = ({
                                                   history,
                                                   authenticator,
                                                   authenticatedUserStore,
                                                   applicationNavigator
                                               }: Props) => {
    const authorisedResourceClient = new AxiosAuthorisedResourceClient(authenticatedUserStore, applicationNavigator);
    const profileClient = new ProfileClient(authorisedResourceClient);
    const profileFeatureNavigator = new BrowserHistoryProfileFeatureNavigator(history);
    const profileSearchService = new ProfileSearchService(profileClient, profileFeatureNavigator);

    return (
        <div>
            <Routes>
                <Route path="/" element={<Layout authenticatedUserStore={authenticatedUserStore}/>}>
                    <Route path={ProfileFeatureRoute.SEARCH} element={
                        <AuthenticatedRouteGuard authenticator={authenticator}
                                                 authenticatedUserStore={authenticatedUserStore}>
                            <ProfileSearchLanding profileSearchService={profileSearchService}/>
                        </AuthenticatedRouteGuard>
                    }/>
                    <Route path={ProfileFeatureRoute.RESULTS} element={
                        <AuthenticatedRouteGuard authenticator={authenticator}
                                                 authenticatedUserStore={authenticatedUserStore}>
                            <ProfileSearchResults applicationNavigator={applicationNavigator}
                                                  profileSearchService={profileSearchService}/>
                        </AuthenticatedRouteGuard>
                    }/>
                    <Route path={ProfileFeatureRoute.PROFILE} element={
                        <AuthenticatedRouteGuard authenticator={authenticator}
                                                 authenticatedUserStore={authenticatedUserStore}>
                            <ProfileEdit profileClient={profileClient} authenticatedUserStore={authenticatedUserStore}/>
                        </AuthenticatedRouteGuard>
                    }/>
                </Route>
            </Routes>
        </div>
    );
};