import {BrowserHistoryProfileFeatureNavigator} from "./shared/navigation";
import {ProfileSearchService} from "./shared/ui/profile-search";
import {History} from "history";
import {ApplicationNavigator, AuthenticatedRouteGuard, BrowserHistoryNavigator} from "../shared/navigation";
import {ProfileSearchLanding} from "./search/ProfileSearchLanding";
import {ProfileSearchResults} from "./results/ProfileSearchResults";
import React from "react";
import {Authenticator} from "../shared/authentication/authenticator";
import {AuthenticatedUserStore} from "../shared/authentication/persistence";
import {Route, Routes} from "react-router-dom";
import {AxiosAuthorisedResourceClient, ProfileClient} from "./shared/resource";

type Props = {
    history: History;
    authenticator: Authenticator;
    authenticatedUserStore: AuthenticatedUserStore;
    applicationNavigator: ApplicationNavigator;
};

export const ProfileModule = ({
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
                <Route path={BrowserHistoryNavigator.HOME_ROUTE} element={
                    <AuthenticatedRouteGuard authenticator={authenticator}
                                             authenticatedUserStore={authenticatedUserStore}>
                        <ProfileSearchLanding authenticatedUserStore={authenticatedUserStore}
                                              profileSearchService={profileSearchService}/>
                    </AuthenticatedRouteGuard>
                }/>
                <Route path={BrowserHistoryProfileFeatureNavigator.PROFILE_SEARCH_RESULTS_ROUTE} element={
                    <AuthenticatedRouteGuard authenticator={authenticator}
                                             authenticatedUserStore={authenticatedUserStore}>
                        <ProfileSearchResults applicationNavigator={applicationNavigator}
                                              profileSearchService={profileSearchService}/>
                    </AuthenticatedRouteGuard>
                }/>
            </Routes>
        </div>
    );
};