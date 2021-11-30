import {ProfileSearch, ProfileSearchService} from "../shared/ui/profile-search";
import {ApplicationNavigator} from "../../shared/navigation";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {Profile, ProfileSearchQuery} from "../shared/domain";

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