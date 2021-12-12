import {AuthenticatedUserService} from '../shared/authentication/service/AuthenticatedUserService';
import {BrowserRouter} from 'react-router-dom';
import {Login} from './Login';
import {render, screen} from '@testing-library/react';
import {instance, mock, when} from 'ts-mockito';

describe('on login rendered', () => {
    const authenticatedUserService = mock(AuthenticatedUserService);

    beforeEach(() => {
        render(<Login userService={instance(authenticatedUserService)}/>, {wrapper: BrowserRouter});
    });

    it('show no login error from successful login attempt on login button clicked', async () => {
        when(authenticatedUserService.login()).thenResolve();

        screen.getByAltText('Sign in with Google').click();

        expect(await screen.queryByText("Login attempt was unsuccessful:")).not.toBeInTheDocument();
    });

    it('should show an login error message after unsuccessful login attempt', async () => {
        when(authenticatedUserService.login()).thenReject();

        screen.getByAltText('Sign in with Google').click();

        expect(await screen.findByText("Login attempt was unsuccessful:")).toBeInTheDocument();
    });
});