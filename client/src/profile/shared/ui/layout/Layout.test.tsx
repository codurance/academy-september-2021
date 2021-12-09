import {render, screen} from "@testing-library/react";
import {instance, mock, verify, when} from "ts-mockito";
import React from "react";
import {AuthenticatedUser, AuthenticatedUserStore} from "../../../../shared/authentication/persistence";
import {Layout} from "./Layout";
import {ProfileFeatureNavigator} from "../../navigation";

describe('layout', () => {
    const authenticatedUser = {
        name: "Best User",
        profileImageUrl: 'https://hosting.site/profile/best-user-image.png',
    } as AuthenticatedUser;

    const authenticatedUserStore = mock<AuthenticatedUserStore>();
    const profileFeatureNavigator = mock<ProfileFeatureNavigator>();

    beforeEach(() => {
        when(authenticatedUserStore.get()).thenReturn(authenticatedUser);
        render(
            <Layout authenticatedUserStore={instance(authenticatedUserStore)} profileFeatureNavigator={instance(profileFeatureNavigator)}/>
        );
    });

    it('should display authenticated user information', () => {
        expect(screen.getByText(`${authenticatedUser.name}`)).toBeInTheDocument();
        expect(screen.getByAltText('Profile Image')).toHaveAttribute('src', authenticatedUser.profileImageUrl);
    });

    it('should navigate to the profile edit page when profile image clicked', () => {
        const profileImage = screen.getByAltText('Profile Image');
        profileImage.click();

        verify(profileFeatureNavigator.navigateToProfile()).called();
    });

    it('should navigate to the search page when SkillSet logo clicked', () => {
        const logo = screen.getByAltText('Home');
        logo.click();

        verify(profileFeatureNavigator.navigateToSearch()).called();
    });
});