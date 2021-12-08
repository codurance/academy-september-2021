import {render, screen} from "@testing-library/react";
import {anything, capture, instance, mock, when} from "ts-mockito";
import {ProfileSearchService} from "./ProfileSearchService";
import {ProfileSearch} from './ProfileSearch';
import {ProfileSearchQuery} from "skillset";
import userEvent from "@testing-library/user-event";

describe('profile search', () => {

    const profileSearchService = mock(ProfileSearchService);

    it('should have clean search when no query provided', () => {
        renderProfileSearch();

        const search = screen.getByPlaceholderText('Java, TypeScript, React...');
        expect(search).toHaveValue('');
    });

    it('should prefill search when query provided', () => {
        const query: ProfileSearchQuery = {
            skills: ['TypeScript', 'Python'],
            hasRequestedAvailableOnly: false
        };

        render(<ProfileSearch profileSearchService={instance(profileSearchService)} query={query}/>);

        const search = screen.getByPlaceholderText('Java, TypeScript, React...');
        expect(search).toHaveValue('TypeScript, Python');
    });

    it('should provide loading feedback when waiting for search result', async () => {
        when(profileSearchService.search(anything())).thenResolve();
        renderProfileSearch();

        await submitSearch('PHP');

        expect(screen.getByPlaceholderText('Java, TypeScript, React...')).toBeDisabled();
        expect(screen.getByLabelText('Loading')).toBeInTheDocument();
    });

    it('should perform search with provided skill', async () => {
        when(profileSearchService.search(anything())).thenResolve();
        renderProfileSearch();

        await submitSearch('React, TypeScript, Serverless');

        const expectedQuery = {skills: ['React', 'TypeScript', 'Serverless'], hasRequestedAvailableOnly: false};
        const capturedQuery = capture(profileSearchService.search).last()[0];
        expect(capturedQuery).toEqual(expectedQuery);
    });

    it('should show error when unable to search', async () => {
        when(profileSearchService.search(anything())).thenReject();
        renderProfileSearch();

        await submitSearch('Ruby');

        expect(await screen.findByText("Network Error, try again.")).toBeInTheDocument();
    });

    it('should perform search with filter for availability', async () => {
        when(profileSearchService.search(anything())).thenResolve();
        renderProfileSearch();

        toggleIsAvailable();

        await submitSearch('React, TypeScript, Serverless');

        const expectedQuery = {skills: ['React', 'TypeScript', 'Serverless'], hasRequestedAvailableOnly: true};
        const capturedQuery = capture(profileSearchService.search).last()[0];
        expect(capturedQuery).toEqual(expectedQuery);
    });

    const renderProfileSearch = () => {
        render(<ProfileSearch profileSearchService={instance(profileSearchService)}/>);
    };

    const submitSearch = (term: string) => {
        const search = screen.getByPlaceholderText('Java, TypeScript, React...');
        userEvent.type(search, term);
        const searchButton = screen.getByLabelText('Search');
        searchButton.click();
    };

    const toggleIsAvailable = () => {
        const isAvailableFilterLabel = screen.getByText('Only show available consultants');
        const isAvailableFilterCheckbox = isAvailableFilterLabel.parentElement!; // eslint-disable-line @typescript-eslint/no-non-null-assertion
        userEvent.click(isAvailableFilterCheckbox);
    };
});