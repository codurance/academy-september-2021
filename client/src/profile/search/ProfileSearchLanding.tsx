import {ProfileSearch, ProfileSearchService} from "../shared/ui/profile-search";
import {Logo} from "../../shared/ui/Logo";
import React from "react";

type Props = {
    profileSearchService: ProfileSearchService
};

export const ProfileSearchLanding: React.FC<Props> = ({profileSearchService}: Props) => {
    return (
        <>
            <Logo />
            <ProfileSearch profileSearchService={profileSearchService}/>
        </>
    );
};