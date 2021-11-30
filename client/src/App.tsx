import React from 'react';
import {Route, Routes} from "react-router-dom";
import {GoogleAuthenticator, GoogleUserProvider} from "./shared/authentication/authenticator";
import {LocalStorageAuthenticatedUserStore} from "./shared/authentication/persistence";
import {AuthenticatedRouteGuard, BrowserHistoryNavigator} from "./shared/navigation";
import {Login, LoginService} from "./login";
import {Home} from './profile';
import {ProfileSearchService} from "./profile/shared/ui/profile-search/ProfileSearchService";
import {AxiosAuthorisedResourceClient} from "./shared/resource/AxiosAuthorisedResourceClient";
import {ProfileClient} from "./profile/shared/resource/ProfileClient";
import {BrowserHistoryProfileFeatureNavigator} from "./profile/shared/navigation/BrowserHistoryProfileFeatureNavigator";
import {ProfileSearchResults} from "./profile/results/ProfileSearchResults";
import {createBrowserHistory} from "history";
import {BrowserRouter} from "./shared/navigation/BrowserRouter";

function App() {
    const history = createBrowserHistory();
    const googleUserProvider = new GoogleUserProvider();
    const authenticator = new GoogleAuthenticator(googleUserProvider);
    const authenticatedUserStore = new LocalStorageAuthenticatedUserStore();
    const applicationNavigator = new BrowserHistoryNavigator(history);
    const loginService = new LoginService(authenticator, authenticatedUserStore, applicationNavigator);

    const authorisedResourceClient = new AxiosAuthorisedResourceClient(authenticatedUserStore, applicationNavigator);
    const profileClient = new ProfileClient(authorisedResourceClient);
    const profileFeatureNavigator = new BrowserHistoryProfileFeatureNavigator(history);
    const profileSearchService = new ProfileSearchService(profileClient, profileFeatureNavigator);

    return (
        <div className="App">
            <BrowserRouter history={history}>
                <Routes>
                    <Route path={BrowserHistoryNavigator.LOGIN_ROUTE} element={<Login loginService={loginService}/>}/>
                    <Route path={BrowserHistoryNavigator.HOME_ROUTE} element={
                        <AuthenticatedRouteGuard authenticator={authenticator}
                                                 authenticatedUserStore={authenticatedUserStore}>
                            <Home authenticatedUserStore={authenticatedUserStore}
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
            </BrowserRouter>
        </div>
    );
}

export default App;
