import React from 'react';
import {Route, Routes, useNavigate} from "react-router-dom";
import {GoogleAuthenticator, GoogleUserProvider} from "./shared/authentication/authenticator";
import {LocalStorageAuthenticatedUserStore} from "./shared/authentication/persistence";
import {AuthenticatedRouteGuard, ReactRouterNavigator} from "./shared/navigation";
import {Login, LoginService} from "./login";
import {Home} from './home';

function App() {
    const navigator = useNavigate();
    const googleUserProvider = new GoogleUserProvider();
    const authenticator = new GoogleAuthenticator(googleUserProvider);
    const authenticatedUserStore = new LocalStorageAuthenticatedUserStore();
    const applicationNavigator = new ReactRouterNavigator(navigator);
    const loginService = new LoginService(authenticator, authenticatedUserStore, applicationNavigator);

    return (
        <div className="App">
            <Routes>
                <Route path={ReactRouterNavigator.LOGIN_ROUTE} element={<Login loginService={loginService}/>}/>
                <Route path={ReactRouterNavigator.HOME_ROUTE} element={
                    <AuthenticatedRouteGuard authenticator={authenticator}
                                             authenticatedUserStore={authenticatedUserStore}>
                        <Home authenticatedUserStore={authenticatedUserStore} />
                    </AuthenticatedRouteGuard>
                }/>
            </Routes>
        </div>
    );
}

export default App;
