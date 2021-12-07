import React from 'react';
import {Route, Routes} from "react-router-dom";
import {GoogleAuthenticator, GoogleUserProvider} from "./shared/authentication/authenticator";
import {LocalStorageAuthenticatedUserStore} from "./shared/authentication/persistence";
import {BrowserHistoryNavigator, BrowserRouter, FeatureRoute} from "./shared/navigation";
import {createBrowserHistory} from "history";
import {ProfileModule} from "./profile/ProfileModule";
import {LoginModule} from "./login/LoginModule";

const App: React.FC = () => {
    const history = createBrowserHistory();
    const googleUserProvider = new GoogleUserProvider();
    const authenticator = new GoogleAuthenticator(googleUserProvider);
    const authenticatedUserStore = new LocalStorageAuthenticatedUserStore();
    const applicationNavigator = new BrowserHistoryNavigator(history);

    return (
        <div className="App">
            <BrowserRouter history={history}>
                <Routes>
                    <Route path={FeatureRoute.LOGIN} element={<LoginModule authenticator={authenticator}
                                                               authenticatedUserStore={authenticatedUserStore}
                                                               applicationNavigator={applicationNavigator}/>}/>

                    <Route path="*" element={<ProfileModule history={history}
                                                            authenticator={authenticator}
                                                            authenticatedUserStore={authenticatedUserStore}
                                                            applicationNavigator={applicationNavigator}/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
