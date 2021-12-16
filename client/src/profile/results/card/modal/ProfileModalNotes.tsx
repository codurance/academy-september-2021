import React from "react";
import {Grid, Header, Segment} from "semantic-ui-react";
import ReactMarkdown from "react-markdown";

type Props = {
    notes: string
};

export const ProfileModalNotes: React.FC<Props> = ({notes}) => {

    return (
        <>
            <Header as="h1">Notes</Header>
            <Grid padded verticalAlign={"middle"}>
                <Grid.Row>
                    <Grid.Column>
                        <Segment style={{overflow: 'auto', height: 200}}>
                            <ReactMarkdown>{notes}</ReactMarkdown>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </>
    );
};