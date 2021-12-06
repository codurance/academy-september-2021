import {render, screen} from "@testing-library/react";
import {instance, mock, when} from "ts-mockito";
import {AuthenticatedUser, AuthenticatedUserStore} from "../../shared/authentication/persistence";
import React from "react";
import {ProfileClient} from "../shared/resource";
import {Profile} from "skillset";
import {ProfileEdit} from "./ProfileEdit";

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

    it('display personal information of the authenticated user if the user has not created a profile', async () => {
        when(profileClient.getSavedProfile()).thenResolve(undefined);

        renderProfileEdit();

        expect(await screen.findByText('It looks like this is your first time creating a profile')).toBeInTheDocument();
        await expectReadOnlyInputToHaveValue('Name', 'Local Best User');
        await expectReadOnlyInputToHaveValue('Email', 'local.best.user@codurance.com');
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
});