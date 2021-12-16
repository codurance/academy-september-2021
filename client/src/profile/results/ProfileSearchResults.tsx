import {ProfileSearch, ProfileSearchService} from "../shared/ui/profile-search";
import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {Profile, ProfileSearchQuery} from "skillset";
import logo from "../../shared/ui/logo.svg";
import {Grid, Header, Image} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import {ProfileFeatureNavigator} from "../shared/navigation";
import {ProfileCard} from "./card/ProfileCard";

type Props = {
    profileFeatureNavigator: ProfileFeatureNavigator,
    profileSearchService: ProfileSearchService
};

export const ProfileSearchResults: React.FC<Props> = ({profileFeatureNavigator, profileSearchService}: Props) => {
    const location = useLocation();
    const [query, setQuery] = useState<ProfileSearchQuery>();
    const [results, setResults] = useState<Profile[]>();

    useEffect(() => {
        const previousSearch = location.state;
        if (!previousSearch || hasTimestampExpired(previousSearch.timestamp)) return profileFeatureNavigator.navigateToSearch();

        setQuery(previousSearch.query);
        setResults(previousSearch.results);
    }, [location.state, profileFeatureNavigator]);

    const hasTimestampExpired = (timestamp: number): boolean =>  {
        const now = new Date();
        const previousHour = now.getHours() - 1;
        const oneHourAgoTimestamp = now.setHours(previousHour);

        return timestamp < oneHourAgoTimestamp;
    };

    return (
        <div style={{paddingBottom: '2rem'}}>
            <Grid verticalAlign='middle'>
                <Grid.Row>
                    <Grid.Column width={2} style={{paddingRight: 0, paddingBottom: '1.5em'}}>
                        <Image src={logo} height={100} width={75} floated={"right"}/>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <ProfileSearch profileSearchService={profileSearchService} query={query}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

            <Grid divided="vertically">
                <Grid.Row stretched>

                    {!results?.length &&
                    <Grid.Column>
                        <Header as="h2" textAlign={"center"}>No results found</Header>
                    </Grid.Column>
                    }

                    {results?.map(profile => (
                        <Grid.Column mobile={16} tablet={8} computer={4} key={profile.name}>
                            <ProfileCard profile={profile} requestedSkills={query?.skills ?? []}/>
                        </Grid.Column>
                    ))}
                </Grid.Row>
            </Grid>
        </div>
    );

};
