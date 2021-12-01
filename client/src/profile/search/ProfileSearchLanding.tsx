import {ProfileSearch, ProfileSearchService} from "../shared/ui/profile-search";
import {Logo} from "../../shared/ui/Logo";

type Props = {
    profileSearchService: ProfileSearchService
};

export const ProfileSearchLanding = ({profileSearchService}: Props) => {
    return (
        <>
            <Logo />
            <ProfileSearch profileSearchService={profileSearchService}/>
        </>
    );
};