import {Form, Segment} from "semantic-ui-react";
import React from "react";
import ReactMarkdown from 'react-markdown';
import {Grid, Header} from 'semantic-ui-react';

type Props = {
    notes: string,
    onNotesUpdated: (notes: string) => void
};

export const EditNotes: React.FC<Props> = ({notes, onNotesUpdated}: Props) => {

    return(
        <Grid columns='equal'>
            <Grid.Row>
                <Header as="h3">
                    <Header.Content>Notes</Header.Content>
                    <Header.Subheader>Here you can add any certifications, aspirations, side projects or anything else of interest. You can use <a href="https://www.markdownguide.org/basic-syntax/" target="_blank" rel="noreferrer">Markdown</a> to format your notes. </Header.Subheader>
                </Header>
            </Grid.Row>
            <Grid.Row>
            <Grid.Column width={8}>
                <Form.TextArea maxLength={2000} fluid value={notes} onChange={event => onNotesUpdated(event.target.value)} style={{height: 200}}>
                </Form.TextArea>
            </Grid.Column>
            <Grid.Column width={8}>
                <Segment style={{overflow: 'auto', height: 200}} rows={30}>
                <ReactMarkdown>{notes}</ReactMarkdown>
                </Segment>
            </Grid.Column>
            </Grid.Row>
        </Grid>
    );


};