import {BrowserHistoryProfileFeatureNavigator, ProfileFeatureRoute} from "./shared/navigation";
import {ProfileSearchService} from "./shared/ui/profile-search";
import {History} from "history";
import {AuthenticatedRouteGuard} from "../shared/navigation";
import {ProfileSearchLanding} from "./search/ProfileSearchLanding";
import {ProfileSearchResults} from "./results/ProfileSearchResults";
import React from "react";
import {Route, Routes} from "react-router-dom";
import {AuthorisedAxiosResourceClient, ProfileClient} from "./shared/resource";
import {Layout} from "./shared/ui/layout/Layout";
import {ProfileEdit} from "./edit/ProfileEdit";
import {AuthenticatedUserService} from "../shared/authentication/service/AuthenticatedUserService";
import {NotFound} from "../not-found/NotFound";

type Props = {
    history: History;
    authenticatedUserService: AuthenticatedUserService;
};

export const ProfileModule: React.FC<Props> = ({history, authenticatedUserService}) => {
    const resourceClient = new AuthorisedAxiosResourceClient(authenticatedUserService);
    const profileClient = new ProfileClient(resourceClient);
    const profileFeatureNavigator = new BrowserHistoryProfileFeatureNavigator(history);
    const profileSearchService = new ProfileSearchService(profileClient, profileFeatureNavigator);

    return (
        <div>
            <Routes>
                <Route path="/" element={<Layout authenticatedUserService={authenticatedUserService}
                                                 profileFeatureNavigator={profileFeatureNavigator}/>}>
                    <Route path={ProfileFeatureRoute.SEARCH} element={
                        <AuthenticatedRouteGuard authenticatedUserService={authenticatedUserService}>
                            <ProfileSearchLanding profileSearchService={profileSearchService}/>
                        </AuthenticatedRouteGuard>
                    }/>
                    <Route path={ProfileFeatureRoute.RESULTS} element={
                        <AuthenticatedRouteGuard authenticatedUserService={authenticatedUserService}>
                            <ProfileSearchResults profileFeatureNavigator={profileFeatureNavigator}
                                                  profileSearchService={profileSearchService}/>
                        </AuthenticatedRouteGuard>
                    }/>
                    <Route path={ProfileFeatureRoute.PROFILE} element={
                        <AuthenticatedRouteGuard authenticatedUserService={authenticatedUserService}>
                            <ProfileEdit profileClient={profileClient}
                                         authenticatedUserService={authenticatedUserService}
                                         windowView={window}/>
                        </AuthenticatedRouteGuard>
                    }/>
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
};