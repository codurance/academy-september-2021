import {render, screen} from "@testing-library/react";
import {anything, capture, instance, mock, when} from "ts-mockito";
import {AuthenticatedUser} from "../../shared/authentication/persistence";
import React from "react";
import {ProfileClient} from "../shared/resource";
import {Profile, ProfileSkill, UpdatedProfile} from "skillset";
import {ProfileEdit} from "./ProfileEdit";
import userEvent from "@testing-library/user-event";
import {AuthenticatedUserService} from "../../shared/authentication/service/AuthenticatedUserService";

describe('editing a profile should', () => {
    const profileClient = mock(ProfileClient);
    const authenticatedUserService = mock<AuthenticatedUserService>();
    const windowView = mock<Window>();

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
        withSavingProfileForFirstTime();

        renderProfileEdit();

        expect(await screen.findByText('It looks like this is your first time creating a profile')).toBeInTheDocument();
        await expectReadOnlyInputToHaveValue('Name', 'Local Best User');
        await expectReadOnlyInputToHaveValue('Email', 'local.best.user@codurance.com');
    });

    it('save profile on save clicked', async () => {
        withSavingProfileForFirstTime();
        const expectedUpdatedProfile: UpdatedProfile = {
            skills: [{name: 'React', level: 5}],
            role: 'Software Craftsperson',
            availability: {
                isAvailable: false,
                client: 'Best Company'
            }
        };
        when(profileClient.save(anything())).thenResolve();
        renderProfileEdit();
        selectDropdownValue('Select Skill', 'React');
        selectDropdownValue('Select Level', '5');
        clickInput('Add Skill');
        selectDropdownValue('Select Role', 'Software Craftsperson');
        toggleAvailability();
        inputText('Current Client','Best Company');
        await saveProfile();

        const capturedUpdatedProfile = capture(profileClient.save).last()[0];
        expect(capturedUpdatedProfile).toEqual(expectedUpdatedProfile);
    });

    it('show success message when able to save profile', async () => {
        withSavingProfileForFirstTime();
        when(profileClient.save(anything())).thenResolve();
        renderProfileEdit();

        await saveProfile();

        expect(await screen.findByText('Profile Saved')).toBeInTheDocument();
    });

    it('show error message when unable to save profile', async () => {
        withSavingProfileForFirstTime();
        when(profileClient.save(anything())).thenReject();
        renderProfileEdit();

        await saveProfile();

        expect(await screen.findByText('Unable to save profile, please try again')).toBeInTheDocument();
    });

    it('scrolls to top after save', async () => {
        withSavingProfileForFirstTime();
        when(profileClient.save(anything())).thenResolve();
        renderProfileEdit();

        await saveProfile();
        await screen.findByText('Profile Saved');

        const capturedWindowViewInteraction = capture(windowView.scrollTo).last()[0];
        expect(capturedWindowViewInteraction).toEqual({
            top: 0,
            behavior: "smooth"
        });
    });

    const renderProfileEdit = () => {
        const authenticatedUser = {
            name: 'Local Best User',
            email: 'local.best.user@codurance.com'
        } as AuthenticatedUser;
        when(authenticatedUserService.getAuthenticatedUser()).thenReturn(authenticatedUser);
        render(<ProfileEdit profileClient={instance(profileClient)}
                            authenticatedUserService={instance(authenticatedUserService)}
                            windowView={instance(windowView)}/>);
    };

    const withSavingProfileForFirstTime = () => {
        when(profileClient.getProfile('local.best.user@codurance.com')).thenResolve(undefined);
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

    const inputText = (label: string, value: string) => {
        const labelElement = screen.getByText(label);
        const field = labelElement.parentElement;
        const input = field?.querySelector('input');
        userEvent.type(input!, value); // eslint-disable-line @typescript-eslint/no-non-null-assertion
    };

    const toggleAvailability = () => {
        const label = screen.getByText('I am able available to be placed onto a client');
        const checkbox = label.parentElement;
        userEvent.click(checkbox!); // eslint-disable-line @typescript-eslint/no-non-null-assertion
    };

    const saveProfile = async () => {
        const saveButton = await screen.findByText('Save');
        saveButton.click();
    };

});