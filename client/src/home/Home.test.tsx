import {render, screen} from "@testing-library/react";
import {instance, when, mock} from "ts-mockito";
import React from "react";
import {AuthenticatedUser, AuthenticatedUserStore} from "../shared/authentication/persistence";
import {Home} from '.';

describe('on Home rendered', () => {
    it('should display the name and image of the authenticated user', () => {
        const authenticatedUserStore = mock<AuthenticatedUserStore>();
        const authenticatedUser = {
            name: "Best User",
            profileImageUrl: 'https://hosting.site/profile/best-user-image.png',
        } as AuthenticatedUser;
        when(authenticatedUserStore.get()).thenReturn(authenticatedUser);

        render(<Home authenticatedUserStore={instance(authenticatedUserStore)}/>);

        expect(screen.getByText(`Logged in as: ${authenticatedUser.name}`)).toBeInTheDocument();
        expect(screen.getByAltText('User Profile')).toHaveAttribute('src', authenticatedUser.profileImageUrl);
    });
});