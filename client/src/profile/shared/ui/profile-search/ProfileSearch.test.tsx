import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {anything, capture, instance, mock, when} from "ts-mockito";
import {ProfileSearchService} from "./ProfileSearchService";
import React from "react";
import {ProfileSearch} from './ProfileSearch';
import {ProfileSearchQuery} from "../../domain/ProfileSearchQuery";

describe('profile search', () => {

    const profileSearchService = mock(ProfileSearchService);

    it('should have clean search when no query provided', () => {
        renderProfileSearch();

        const search = screen.getByPlaceholderText('Java, TypeScript, React...');
        expect(search).toHaveValue('');
    });

    it('should prefill search when query provided', () => {
        const query: ProfileSearchQuery = {
            skills: ['TypeScript']

        };

        render(<ProfileSearch profileSearchService={instance(profileSearchService)} query={query}/>);

        const search = screen.getByPlaceholderText('Java, TypeScript, React...');
        expect(search).toHaveValue('TypeScript');
    });

    it('should perform search with provided skill', async () => {
        when(profileSearchService.search(anything())).thenResolve();

        renderProfileSearch();

        submitSearch('React');

        const expectedQuery = {skills: ['React']};
        expect(capture(profileSearchService.search).last()).toEqual([expectedQuery]);
    });

    it('should show error when unable to search', async () => {
        when(profileSearchService.search(anything())).thenReject();
        renderProfileSearch();

        submitSearch('Ruby');

        expect(await screen.findByText("Network Error, try again.")).toBeInTheDocument();
    });

    const renderProfileSearch = () => {
        render(<ProfileSearch profileSearchService={instance(profileSearchService)}/>);
    };

    const submitSearch = (term: string) => {
        const search = screen.getByPlaceholderText('Java, TypeScript, React...');
        userEvent.type(search, term);
        screen.getByLabelText('Search').click();
    };
});