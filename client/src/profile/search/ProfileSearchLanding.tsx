import {AuthenticatedUserStore} from "../../shared/authentication/persistence";
import {ProfileSearch, ProfileSearchService} from "../shared/ui/profile-search";

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