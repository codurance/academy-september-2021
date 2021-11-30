import {ProfileSearchService} from "../shared/ui/profile-search/ProfileSearchService";
import {ProfileSearch} from "../shared/ui/profile-search/ProfileSearch";
import {ApplicationNavigator} from "../../shared/navigation";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {Profile} from "../shared/domain/Profile";
import {ProfileSearchQuery} from "../shared/domain/ProfileSearchQuery";

type Props = {
    applicationNavigator: ApplicationNavigator,
    profileSearchService: ProfileSearchService
}

export const ProfileSearchResults = ({applicationNavigator, profileSearchService}: Props) => {
    const location = useLocation();
    const [query, setQuery] = useState<ProfileSearchQuery>();
    const [results, setResults] = useState<Profile[]>();

    useEffect(() => {
        const previousSearch = location.state;
        if (!previousSearch) return applicationNavigator.navigateToHome();

        setQuery(previousSearch.query);
        setResults(previousSearch.results);
    }, [location.state, applicationNavigator]);

    return (
        <>
            <ProfileSearch profileSearchService={profileSearchService} query={query}/>

            {!results?.length &&
            <p>No results found</p>
            }

            {results?.map(profile => {
                return <p key="{profile}">{profile.name}</p>
            })}
        </>
    );
}