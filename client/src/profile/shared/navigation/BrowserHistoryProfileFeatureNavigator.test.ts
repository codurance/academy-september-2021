import {renderHook} from "@testing-library/react-hooks";
import {BrowserRouter, useLocation} from "react-router-dom";
import {act, waitFor} from "@testing-library/react";
import {ProfileSearchQuery} from "../domain/ProfileSearchQuery";
import {Profile} from "../domain/Profile";
import {BrowserHistoryProfileFeatureNavigator} from "./BrowserHistoryProfileFeatureNavigator";
import {createBrowserHistory, Location} from "history";

describe('react router profile feature navigator', () => {
    const history = createBrowserHistory();

    const reactRouterProfileFeatureNavigator = new BrowserHistoryProfileFeatureNavigator(history);

    it('should navigate to results with search query and results available in state', () => {
        const query: ProfileSearchQuery = {
            skills: ['Java']
        };
        const results: Profile[] = [
            {name: 'Jordan Steele'}
        ];

        act(() => {
            reactRouterProfileFeatureNavigator.navigateToResults(query, results);
        });

        return waitFor(() => {
            expect(window.location.pathname).toEqual('/results');
            expect(history.location.state).toEqual({query, results});
        });
    });
});