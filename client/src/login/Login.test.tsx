import React from 'react';
import {LoginService} from './LoginService'
import {BrowserRouter} from 'react-router-dom'
import {Login} from './Login'
import {render, screen} from '@testing-library/react'
import {instance, mock, when} from 'ts-mockito';

describe('on login rendered', () => {
    const loginService = mock(LoginService);

    beforeEach(() => {
        render(<Login loginService={instance(loginService)}/>, {wrapper: BrowserRouter})
    })

    it('show no login error from successful login attempt on login button clicked', async () => {
        when(loginService.login()).thenResolve();

        screen.getByText('Login HELLO WORLD!!', {selector: 'button'}).click();

        expect(await screen.queryByText("Login attempt was unsuccessful, please check the following:")).not.toBeInTheDocument();
    });

    it('should show an login error message after unsuccessful login attempt', async () => {
        when(loginService.login()).thenReject();

        screen.getByText('Login', {selector: 'button'}).click();

        expect(await screen.findByText("Login attempt was unsuccessful, please check the following:")).toBeInTheDocument();
    })
})