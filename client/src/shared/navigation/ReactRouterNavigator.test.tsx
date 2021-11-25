import {ReactRouterNavigator} from ".";
import {act, waitFor} from "@testing-library/react";
import {renderHook} from "@testing-library/react-hooks";
import {BrowserRouter, useNavigate} from "react-router-dom";

describe('ReactRouterNavigator', () => {
    const navigator = renderHook(() => useNavigate(), {wrapper: BrowserRouter});
    const renderedNavigator = navigator.result.current;

    const reactRouterNavigator = new ReactRouterNavigator(renderedNavigator);

    it('should navigate to home', async () => {
        act(() => {
            renderedNavigator('/another-route');

            reactRouterNavigator.navigateToHome();
        });

        return waitFor(() => {
            expect(window.location.pathname).toEqual('/');
        });
    });

    it('should navigate to login', () => {
        act(() => {
            reactRouterNavigator.navigateToLogin();
        });

        return waitFor(() => {
            expect(window.location.pathname).toEqual('/login');
        });
    });
});