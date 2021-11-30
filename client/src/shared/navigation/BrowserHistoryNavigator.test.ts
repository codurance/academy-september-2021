import {BrowserHistoryNavigator} from ".";
import {act, waitFor} from "@testing-library/react";
import {renderHook} from "@testing-library/react-hooks";
import {BrowserRouter, useNavigate} from "react-router-dom";
import {createBrowserHistory} from "history";

describe('ReactRouterNavigator', () => {
    const history = createBrowserHistory();

    const browserHistoryNavigator = new BrowserHistoryNavigator(history);

    it('should navigate to home', async () => {
        history.replace('/other-route');

        browserHistoryNavigator.navigateToHome();

        return waitFor(() => {
            expect(window.location.pathname).toEqual('/');
        });
    });

    it('should navigate to login', () => {
        browserHistoryNavigator.navigateToLogin();

        return waitFor(() => {
            expect(window.location.pathname).toEqual('/login');
        });
    });
});