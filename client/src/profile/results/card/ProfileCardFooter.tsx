import React from "react";
import {Grid, Icon} from "semantic-ui-react";
import {Profile} from "skillset";

type Props = {
    profile: Profile;
};

export const ProfileCardFooter: React.FC<Props> = ({profile}) => {
    const MAX_CLIENT_CHARACTER_LIMIT = 14;
    const MAX_CLIENT_REDACTED_LIMIT = 11;

    const getFormattedClientName = () => {
        const client = profile.availability.client;
        if (!client) return;
        if (client.length < MAX_CLIENT_CHARACTER_LIMIT) return client;

        const redactedClient = client.slice(0, MAX_CLIENT_REDACTED_LIMIT);
        return `${redactedClient}...`;
    };

    return (
        <Grid>
            <Grid.Row columns={2}>
                <Grid.Column>
                    {profile.availability.isAvailable
                        ? <span><Icon name="check circle" color="green"/> Available</span>
                        : <span><Icon name="minus circle" color="red"/>{getFormattedClientName()}</span>
                    }
                </Grid.Column>
                <Grid.Column textAlign={"right"}>
                    <span>{profile.location}</span>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};