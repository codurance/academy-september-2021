import {render, screen} from "@testing-library/react";
import {instance, mock, when} from "ts-mockito";
import {AuthenticatedUser, AuthenticatedUserStore} from "../../shared/authentication/persistence";
import React from "react";
import {ProfileClient} from "../shared/resource";
import {Profile} from "skillset";
import {ProfileEdit} from "./ProfileEdit";
import userEvent from "@testing-library/user-event";

describe('editing a profile should', () => {
    const profileClient = mock(ProfileClient);
    const authenticatedUserStore = mock<AuthenticatedUserStore>();

    it('display retrieved profile when the user has saved a profile before', async () => {
        const profile: Profile = {
            name: 'Retrieved Best User',
            email: 'retrieved.best.user@codurance.com',
        } as Profile;
        when(profileClient.getSavedProfile()).thenResolve(profile);

        renderProfileEdit();

        expect(await screen.queryByText('It looks like this is your first time creating a profile')).not.toBeInTheDocument();
        await expectReadOnlyInputToHaveValue('Name', 'Retrieved Best User');
        await expectReadOnlyInputToHaveValue('Email', 'retrieved.best.user@codurance.com');
    });

    it('display authenticated user when the user has not saved a profile before', async () => {
        when(profileClient.getSavedProfile()).thenResolve(undefined);

        renderProfileEdit();

        expect(await screen.findByText('It looks like this is your first time creating a profile')).toBeInTheDocument();
        await expectReadOnlyInputToHaveValue('Name', 'Local Best User');
        await expectReadOnlyInputToHaveValue('Email', 'local.best.user@codurance.com');
    });

    it('update rating for added skill that has been edited', () => {
        when(profileClient.getSavedProfile()).thenResolve(undefined);
        renderProfileEdit();
        addSkill('TypeScript', '1');

        clickIconButton('Edit');
        selectDropdownWithSelection('1', '5');
        clickIconButton('Edit');

        const dropdown = screen.getAllByText('5')[0];
        expect(dropdown).toHaveClass('default');
    });

    it('remove skill', async () => {
        when(profileClient.getSavedProfile()).thenResolve(undefined);
        renderProfileEdit();
        addSkill('React', '5');

        clickIconButton('Delete');

        expect(await screen.queryByText('React', {selector: 'div'})).not.toBeInTheDocument();
    });

    const renderProfileEdit = () => {
        const authenticatedUser = {
            name: 'Local Best User',
            email: 'local.best.user@codurance.com'
        } as AuthenticatedUser;
        when(authenticatedUserStore.get()).thenReturn(authenticatedUser);
        render(<ProfileEdit profileClient={instance(profileClient)}
                            authenticatedUserStore={instance(authenticatedUserStore)}/>);
    };

    const expectReadOnlyInputToHaveValue = async (label: string, value: string) => {
        const labelElement = screen.getByText(label);
        const field = labelElement.parentElement;
        const input = field?.querySelector('input');
        expect(input).toHaveValue(value);
        expect(input).toHaveAttribute('readonly');
    };

    const addSkill = (name: string, level: string) => {
        selectDropdownValue('Select Skill', name);
        selectDropdownValue('Select Level', level);
        clickInput('Add Skill');
    };

    const selectDropdownValue = (dropdownPlaceholder: string, selection: string) => {
        clickInput(dropdownPlaceholder);
        clickInput(selection);
    };

    const clickInput = (text: string) => {
        const input = screen.getByText(text);
        userEvent.click(input);
    };

    const clickIconButton = (label: string) => {
        const button = screen.getByLabelText(label);
        userEvent.click(button);
    };

    const selectDropdownWithSelection = (currentSelection: string, newSelection: string) => {
        const dropdown = screen.getAllByText(currentSelection)[0];
        userEvent.click(dropdown);

        const selection = screen.getAllByText(newSelection)[0];
        userEvent.click(selection);
    };
});