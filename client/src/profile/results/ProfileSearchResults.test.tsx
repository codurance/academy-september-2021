import {act, render, screen, waitFor} from "@testing-library/react";
import {ProfileSearchResults} from "./ProfileSearchResults";
import {instance, mock, verify} from "ts-mockito";
import {ProfileSearchService} from "../shared/ui/profile-search";
import {BrowserRouter} from "../../shared/navigation";
import {Route, Routes} from "react-router-dom";
import React from "react";
import {createBrowserHistory} from "history";
import {Profile} from "skillset";
import {ProfileFeatureNavigator} from "../shared/navigation";

describe('profile search results', () => {
    const history = createBrowserHistory();

    const profileFeatureNavigator = mock<ProfileFeatureNavigator>();
    const profileSearchService = mock(ProfileSearchService);

    beforeEach(() => {
        loadRoutes();
        act(() => {
            history.replace('/');
        });
    });

    it('should navigate to search for manual navigation to search results', () => {
        act(() => {
            history.push('/results');
        });

        return waitFor(() => {
            verify(profileFeatureNavigator.navigateToSearch()).called();
        });
    });

    it('should navigate to search for outdated search results', () => {
        const outdatedTimestamp = buildOutdatedTimestamp();

        const state = {
            query: {
                skills: ['Java']
            },
            results: [],
            timestamp: outdatedTimestamp
        };

        navigateToResults(state);

        return waitFor(() => {
            verify(profileFeatureNavigator.navigateToSearch()).called();
        });
    });

    it('should populate search query from previous search', () => {
        const state = {
            query: {
                skills: ['Java']
            },
            results: [],
            timestamp: Date.now()
        };

        navigateToResults(state);

        const search = screen.getByPlaceholderText('Java, TypeScript, React...');
        expect(search).toHaveValue('Java');
    });

    it('should show search results', async () => {
        const profile: Profile = {
            name: 'Jordan Steele',
            email: 'jordan.steele@codurance.com',
            role: 'Software Craftsperson',
            location: 'Remote',
            imageUrl: "http://localhost:3000/profile/jordan.steele.png",
            skills: [{name: 'Java', level: 4}, {name: 'Kotlin', level: 3}],
            availability: {
                isAvailable: false,
                client: "Best Company"
            }
        };
        const state = {
            query: {skills: ['Java']},
            results: [profile],
            timestamp: Date.now()
        };

        navigateToResults(state);

        expect(await screen.findByText('Jordan Steele')).toBeInTheDocument();
    });

    it('should show no results when no search results found', async () => {
        const state = {
            query: {
                skills: ['Python']
            },
            results: [],
            timestamp: Date.now()
        };

        navigateToResults(state);

        expect(await screen.findByText('No results found')).toBeInTheDocument();
    });

    const loadRoutes = () => {
        render(
            <BrowserRouter history={history}>
                <Routes>
                    <Route path="/" element={<p>Other route</p>}/>
                    <Route path="/results"
                           element={<ProfileSearchResults profileFeatureNavigator={instance(profileFeatureNavigator)}
                                                          profileSearchService={instance(profileSearchService)}/>}/>
                </Routes>
            </BrowserRouter>
        );
    };

    const navigateToResults = (state: unknown) => {
        act(() => {
            history.push('/results', state);
        });
    };

    const buildOutdatedTimestamp = (): number => {
        const now = new Date();
        const previousHour = now.getHours() - 1;
        return now.setHours(previousHour);
    };
});