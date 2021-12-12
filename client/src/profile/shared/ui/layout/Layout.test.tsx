import {render, screen} from "@testing-library/react";
import {instance, mock, verify, when} from "ts-mockito";
import React from "react";
import {AuthenticatedUser, AuthenticatedUserStore} from "../../../../shared/authentication/persistence";
import {Layout} from "./Layout";
import {ProfileFeatureNavigator} from "../../navigation";
import {UserService} from "../../../../shared/user/service/UserService";

describe('layout should', () => {
    const authenticatedUser = {
        name: "Best User",
        profileImageUrl: 'https://hosting.site/profile/best-user-image.png',
    } as AuthenticatedUser;

    const authenticatedUserStore = mock<AuthenticatedUserStore>();
    const profileFeatureNavigator = mock<ProfileFeatureNavigator>();
    const userService = mock(UserService);

    beforeEach(() => {
        when(authenticatedUserStore.get()).thenReturn(authenticatedUser);
        render(
            <Layout
                authenticatedUserStore={instance(authenticatedUserStore)}
                profileFeatureNavigator={instance(profileFeatureNavigator)}
                userService={instance(userService)}
            />
        );
    });

    it('display authenticated user information', () => {
        expect(screen.getByText(`${authenticatedUser.name}`)).toBeInTheDocument();
        expect(screen.getByAltText('Profile Image')).toHaveAttribute('src', authenticatedUser.profileImageUrl);
    });

    it('navigate to the profile edit page when profile clicked', () => {
        clickText('Best User');
        clickText('Profile');

        verify(profileFeatureNavigator.navigateToProfile()).called();
    });

    it('perform logout when logout clicked', () => {
        clickText('Best User');
        clickText('Logout');

        verify(userService.logout()).called();
    });

    it('navigate to the search page when SkillSet logo clicked', () => {
        const logo = screen.getByAltText('Home');
        logo.click();

        verify(profileFeatureNavigator.navigateToSearch()).called();
    });

    const clickText = (text: string) => {
        const userDropdown = screen.getByText(text);
        userDropdown.click();
    };
});