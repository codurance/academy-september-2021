import React from "react";
import {Grid, Icon} from "semantic-ui-react";
import {Profile} from "skillset";

type Props = {
    profile: Profile;
};

export const ProfileCardFooter: React.FC<Props> = ({profile}) =>
    <Grid>
        <Grid.Row columns={2}>
            <Grid.Column>
                {profile.availability.isAvailable
                    ? <span><Icon name="check circle" color="green"/> Available</span>
                    : <span><Icon name="minus circle" color="red"/>{profile.availability.client}</span>
                }
            </Grid.Column>
            <Grid.Column textAlign={"right"}>
                <span>{profile.location}</span>
            </Grid.Column>
        </Grid.Row>
    </Grid>;