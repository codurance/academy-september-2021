import {act, waitFor} from "@testing-library/react";
import {Profile} from "skillset";
import {BrowserHistoryProfileFeatureNavigator} from "./BrowserHistoryProfileFeatureNavigator";
import {createBrowserHistory} from "history";
import {FeatureRoute} from "../../../shared/navigation/FeatureRoute";
import {ProfileSearchState} from "../ui/profile-search/ProfileSearchState";

describe('react router profile feature navigator', () => {
    const history = createBrowserHistory();

    const browserHistoryProfileFeatureNavigator = new BrowserHistoryProfileFeatureNavigator(history);

    it('should navigate to results with search query and results available in state', () => {
        const state: ProfileSearchState = {
            query: {
                skills: ['Java'],
                hasRequestedAvailableOnly: false,
                hasRequestedExactMatches: false
            },
            results: [
                {name: 'Jordan Steele'} as Profile
            ],
            timestamp: Date.now()
        };

        act(() => {
            browserHistoryProfileFeatureNavigator.navigateToResults(state);
        });

        return waitFor(() => {
            expect(window.location.pathname).toEqual('/results');
            expect(history.location.state).toEqual(state);
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

    it('should navigate to search', () => {
        act(() => {
            browserHistoryProfileFeatureNavigator.navigateToSearch();
        });

        return waitFor(() => {
            expect(window.location.pathname).toEqual(FeatureRoute.PROFILE);
        });
    });
});