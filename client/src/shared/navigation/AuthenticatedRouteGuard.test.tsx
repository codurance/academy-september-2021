import {render, screen} from '@testing-library/react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { AuthenticatedRouteGuard} from ".";
import {AuthenticatedUser, AuthenticatedUserStore} from "../authentication/persistence";
import {instance, mock, when} from "ts-mockito";
import {Authenticator} from "../../services";

describe('AuthenticatedRouteGuard', () => {

    const authenticatedUserStore = mock<AuthenticatedUserStore>();
    const authenticator = mock<Authenticator>();

    it('load protected route when provided valid access token', async () => {
        const authenticatedUser = {accessToken: 'valid-token'} as AuthenticatedUser;
        when(authenticatedUserStore.get()).thenReturn(authenticatedUser);
        when(authenticator.isValidToken('valid-token')).thenReturn(true);

        await attemptProtectedRouteRender();

        expect(await screen.findByText('Protected Route')).toBeInTheDocument();
    })

    it('redirect to login for invalid access token', async () => {
        const authenticatedUser = {accessToken: 'invalid-token'} as AuthenticatedUser;
        when(authenticatedUserStore.get()).thenReturn(authenticatedUser);
        when(authenticator.isValidToken('invalid-token')).thenReturn(false);

        await attemptProtectedRouteRender();

        expect(await screen.findByText('Login')).toBeInTheDocument();
    })

    it('redirect to login if user has not logged in', async () => {
        when(authenticatedUserStore.get()).thenReturn(null);

        await attemptProtectedRouteRender();

        expect(await screen.findByText('Login')).toBeInTheDocument();
    })

    const attemptProtectedRouteRender = async () =>
        render(
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                        <AuthenticatedRouteGuard authenticatedUserStore={instance(authenticatedUserStore)}
                                                 authenticator={instance(authenticator)}>
                            <div>Protected Route</div>
                        </AuthenticatedRouteGuard>
                    }/>
                    <Route path="/login" element={<p>Login</p>}/>
                </Routes>
            </BrowserRouter>
        );
});