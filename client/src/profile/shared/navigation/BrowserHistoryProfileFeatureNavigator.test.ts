import {act, waitFor} from "@testing-library/react";
import {Profile, ProfileSearchQuery} from "../domain";
import {BrowserHistoryProfileFeatureNavigator} from "./BrowserHistoryProfileFeatureNavigator";
import {createBrowserHistory} from "history";

describe('react router profile feature navigator', () => {
    const history = createBrowserHistory();

    const reactRouterProfileFeatureNavigator = new BrowserHistoryProfileFeatureNavigator(history);

    it('should navigate to results with search query and results available in state', () => {
        const query: ProfileSearchQuery = {
            skills: ['Java']
        };
        const results: Profile[] = [
            {name: 'Jordan Steele', role: 'Software Craftsperson'}
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