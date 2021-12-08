import {render, screen} from "@testing-library/react";
import {capture, instance, mock, when} from "ts-mockito";
import {AuthenticatedUser, AuthenticatedUserStore} from "../../shared/authentication/persistence";
import React from "react";
import {ProfileClient} from "../shared/resource";
import {Profile, ProfileSkill, UpdatedProfile} from "skillset";
import {ProfileEdit} from "./ProfileEdit";
import userEvent from "@testing-library/user-event";

describe('editing a profile should', () => {
    const profileClient = mock(ProfileClient);
    const authenticatedUserStore = mock<AuthenticatedUserStore>();

    it('display retrieved profile when the user has saved a profile before', async () => {
        const profile: Profile = {
            name: 'Retrieved Best User',
            email: 'retrieved.best.user@codurance.com',
            skills: [] as ProfileSkill[]
        } as Profile;
        when(profileClient.getProfile('local.best.user@codurance.com')).thenResolve(profile);

        renderProfileEdit();

        expect(await screen.queryByText('It looks like this is your first time creating a profile')).not.toBeInTheDocument();
        await expectReadOnlyInputToHaveValue('Name', 'Retrieved Best User');
        await expectReadOnlyInputToHaveValue('Email', 'retrieved.best.user@codurance.com');
    });

    it('display authenticated user when the user has not saved a profile before', async () => {
        when(profileClient.getProfile('local.best.user@codurance.com')).thenResolve(undefined);

        renderProfileEdit();

        expect(await screen.findByText('It looks like this is your first time creating a profile')).toBeInTheDocument();
        await expectReadOnlyInputToHaveValue('Name', 'Local Best User');
        await expectReadOnlyInputToHaveValue('Email', 'local.best.user@codurance.com');
    });

    it('save profile on save clicked', async () => {
        when(profileClient.getProfile('local.best.user@codurance.com')).thenResolve(undefined);
        const expectedUpdatedProfile: UpdatedProfile = {
            skills: [ { name: 'React', level: 5 } ]
        };
        renderProfileEdit();
        selectDropdownValue('Select Skill', 'React');
        selectDropdownValue('Select Level', '5');
        clickInput('Add Skill');

        screen.getByText('Save').click();

        const capturedUpdatedProfile = capture(profileClient.save).last()[0];
        expect(capturedUpdatedProfile).toEqual(expectedUpdatedProfile);
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

    const selectDropdownValue = (dropdownPlaceholder: string, selection: string) => {
        clickInput(dropdownPlaceholder);
        clickInput(selection);
    };

    const clickInput = (text: string) => {
        const input = screen.getByText(text);
        userEvent.click(input);
    };


});