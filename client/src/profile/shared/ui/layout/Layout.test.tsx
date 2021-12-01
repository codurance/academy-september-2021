import {render, screen} from "@testing-library/react";
import {instance, mock, when} from "ts-mockito";
import React from "react";
import {AuthenticatedUser, AuthenticatedUserStore} from "../../../../shared/authentication/persistence";
import {Layout} from "./Layout";

describe('layout', () => {
    const authenticatedUser = {
        name: "Best User",
        profileImageUrl: 'https://hosting.site/profile/best-user-image.png',
    } as AuthenticatedUser;

    const authenticatedUserStore = mock<AuthenticatedUserStore>();

    beforeEach(() => {
        when(authenticatedUserStore.get()).thenReturn(authenticatedUser);
        render(
            <Layout authenticatedUserStore={instance(authenticatedUserStore)}/>
        );
    });

    it('should display authenticated user information', () => {
        expect(screen.getByText(`${authenticatedUser.name}`)).toBeInTheDocument();
        expect(screen.getByAltText('Profile Image')).toHaveAttribute('src', authenticatedUser.profileImageUrl);
    });
});