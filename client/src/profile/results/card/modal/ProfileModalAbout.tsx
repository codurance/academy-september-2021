import {Profile} from "skillset";
import React from "react";
import {Grid, Header, Icon} from "semantic-ui-react";

type Props = {
    profile: Profile;
};

export const ProfileModalAbout: React.FC<Props> = ({profile}) => {
    return (
        <Grid padded>
            <Grid.Row>
                <Grid.Column>
                    <Header as='h5'>
                        {profile.availability.isAvailable
                            ? <Icon name="check circle" color="green"/>
                            : <Icon name="minus circle" color="red"/>
                        }

                        {profile.availability.isAvailable
                            ? <Header.Content>Available</Header.Content>
                            : <Header.Content>{profile.availability.client}</Header.Content>
                        }
                    </Header>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column>
                    <Header as='h5'>
                        <Icon name="address card"/>
                        <Header.Content>{profile.role}</Header.Content>
                    </Header>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column>
                    <Header as='h5'>
                        <Icon name="mail"/>
                        <Header.Content>{profile.email}</Header.Content>
                    </Header>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column>
                    <Header as='h5'>
                        <Icon name="building"/>
                        <Header.Content>{profile.location}</Header.Content>
                    </Header>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};