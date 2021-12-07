import {act, waitFor} from "@testing-library/react";
import {Profile, ProfileSearchQuery} from "skillset";
import {BrowserHistoryProfileFeatureNavigator} from "./BrowserHistoryProfileFeatureNavigator";
import {createBrowserHistory} from "history";

describe('react router profile feature navigator', () => {
    const history = createBrowserHistory();

    const browserHistoryProfileFeatureNavigator = new BrowserHistoryProfileFeatureNavigator(history);

    it('should navigate to results with search query and results available in state', () => {
        const query: ProfileSearchQuery = {
            skills: ['Java']
        };
        const results: Profile[] = [
            {name: 'Jordan Steele'} as Profile
        ];

        act(() => {
            browserHistoryProfileFeatureNavigator.navigateToResults(query, results);
        });

        return waitFor(() => {
            expect(window.location.pathname).toEqual('/results');
            expect(history.location.state).toEqual({query, results});
        });
    });

    it('should navigate to profile', () => {
        act(() => {
            browserHistoryProfileFeatureNavigator.navigateToProfile();
        });

        return waitFor(() => {
            expect(window.location.pathname).toEqual('/profile');
        });
    });
});