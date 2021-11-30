import {AuthenticatedUserStore} from "../../shared/authentication/persistence";
import {ProfileSearchService} from "../shared/ui/profile-search/ProfileSearchService";
import {ProfileSearch} from "../shared/ui/profile-search/ProfileSearch";

type Props = {
    authenticatedUserStore: AuthenticatedUserStore;
    profileSearchService: ProfileSearchService
}

export const ProfileSearchLanding = ({authenticatedUserStore, profileSearchService}: Props) => {
    const authenticatedUser = authenticatedUserStore.get();

    return (
        <>
            <p>Logged in as: {authenticatedUser?.name}</p>
            <img alt="User Profile" src={authenticatedUser?.profileImageUrl}/>
            <ProfileSearch profileSearchService={profileSearchService} />
        </>
    )
}