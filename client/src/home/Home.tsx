import {AuthenticatedUserStore} from "../shared/authentication/persistence";

export const Home = ({authenticatedUserStore}: {authenticatedUserStore: AuthenticatedUserStore}) => {

    const authenticatedUser = authenticatedUserStore.get();

    return (
        <div>
            <p>Logged in as: {authenticatedUser?.name}</p>
            <img alt="User Profile" src={authenticatedUser?.profileImageUrl} />
        </div>
    )
}