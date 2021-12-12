import {render, screen} from '@testing-library/react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AuthenticatedRouteGuard} from ".";
import {instance, mock, when} from "ts-mockito";
import {AuthenticatedUserService} from "../authentication/service/AuthenticatedUserService";

describe('AuthenticatedRouteGuard', () => {

    const authenticatedUserService = mock<AuthenticatedUserService>();

    it('load protected route with valid session', async () => {
        when(authenticatedUserService.hasValidSession()).thenReturn(true);

        await attemptProtectedRouteRender();

        expect(await screen.findByText('Protected Route')).toBeInTheDocument();
    });

    it('redirect to login for invalid sessionn', async () => {
        when(authenticatedUserService.hasValidSession()).thenReturn(false);

        await attemptProtectedRouteRender();

        expect(await screen.findByText('Login')).toBeInTheDocument();
    });

    const attemptProtectedRouteRender = async () =>
        render(
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                        <AuthenticatedRouteGuard authenticatedUserService={instance(authenticatedUserService)}>
                            <div>Protected Route</div>
                        </AuthenticatedRouteGuard>
                    }/>
                    <Route path="/login" element={<p>Login</p>}/>
                </Routes>
            </BrowserRouter>
        );
});