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
        await expectReadOnlyInputToBeVisible('Retrieved Best User');
        await expectReadOnlyInputToBeVisible('retrieved.best.user@codurance.com');
    });

    it('display personal information of the authenticated user if the user has not created a profile', async () => {
        when(profileClient.getSavedProfile()).thenResolve(undefined);

        renderProfileEdit();

        expect(await screen.findByText('It looks like this is your first time creating a profile')).toBeInTheDocument();
        await expectReadOnlyInputToBeVisible('Local Best User');
        await expectReadOnlyInputToBeVisible('local.best.user@codurance.com');
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

    const expectReadOnlyInputToBeVisible = async (placeholder: string) => {
        const input = await screen.findByPlaceholderText(placeholder);
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('readonly');
    };
});