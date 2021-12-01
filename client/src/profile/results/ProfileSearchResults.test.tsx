import {act, render, screen, waitFor} from "@testing-library/react";
import {ProfileSearchResults} from "./ProfileSearchResults";
import {instance, mock, verify} from "ts-mockito";
import {ProfileSearchService} from "../shared/ui/profile-search/ProfileSearchService";
import {ApplicationNavigator} from "../../shared/navigation";
import {Route, Routes} from "react-router-dom";
import React from "react";
import {BrowserRouter} from "../../shared/navigation/BrowserRouter";
import {createBrowserHistory} from "history";

describe('profile search results', () => {
    const history = createBrowserHistory();

    const applicationNavigator = mock<ApplicationNavigator>();
    const profileSearchService = mock(ProfileSearchService);

    beforeEach(() => {
        loadRoutes();
        act(() => {
            history.replace('/');
        });
    });

    it('should navigate to home for manual navigation to search results', () => {
        act(() => {
            history.push('/results');
        });

        return waitFor(() => {
            verify(applicationNavigator.navigateToHome()).called();
        });
    });

    it('should populate search query from previous search', () => {
        const state = {
            query: {
                skills: ['Java']
            },
            results: [
                {name: 'Jordan Steele'}
            ]
        };

        navigateToResults(state);

        const search = screen.getByPlaceholderText('Java, TypeScript, React...');
        expect(search).toHaveValue('Java');
    });

    it('should show search results', async () => {
        const state = {
            query: {
                skills: ['Java']
            },
            results: [
                {name: 'Jordan Steele', role: 'Software Craftsperson'}
            ]
        };

        navigateToResults(state);

        expect(await screen.findByText('Jordan Steele')).toBeInTheDocument();
        expect(await screen.findByText('Software Craftsperson')).toBeInTheDocument();
    });

    it('should show no results when no search results found', async () => {
        const state = {
            query: {
                skills: ['Python']
            },
            results: []
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
                           element={<ProfileSearchResults applicationNavigator={instance(applicationNavigator)}
                                                          profileSearchService={instance(profileSearchService)}/>}/>
                </Routes>
            </BrowserRouter>
        );
    };

    const navigateToResults = (state: any) => {
        act(() => {
            history.push('/results', state);
        });
    };

})