import {ProfileSearch, ProfileSearchService} from "../shared/ui/profile-search";
import {Logo} from "../../shared/ui/Logo";
import React from "react";
import {Grid} from "semantic-ui-react";

type Props = {
    profileSearchService: ProfileSearchService
};

export const ProfileSearchLanding: React.FC<Props> = ({profileSearchService}: Props) => {
    return (
        <Grid textAlign='center' verticalAlign='middle'>
            <Grid.Column style={{maxWidth: 800, marginTop: '2em'}}>
                <h1>has this rendered in staging?</h1>
                <Logo/>
                <ProfileSearch profileSearchService={profileSearchService}/>
            </Grid.Column>
        </Grid>
    );
};