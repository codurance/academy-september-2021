import React from 'react';
import {LoginService} from './LoginService'
import {BrowserRouter} from 'react-router-dom'
import {Login} from './Login'
import {render, screen} from '@testing-library/react'
import {instance, mock, verify} from 'ts-mockito';

describe('on login rendered', () => {
    it('show no login error from successful login attempt on login button clicked', () => {
        const loginService = mock(LoginService);

        render(<Login loginService={instance(loginService)}/>, {wrapper: BrowserRouter})

        screen.getByText('Login', {selector: 'button'}).click();

        verify(loginService.login()).called()
    });
})