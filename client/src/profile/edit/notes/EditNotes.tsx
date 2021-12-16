import {Accordion, AccordionTitleProps, Form, Icon, Segment, Grid, Header} from "semantic-ui-react";
import React, {SyntheticEvent, useState} from "react";
import ReactMarkdown from "react-markdown";

type Props = {
    notes?: string,
    onNotesUpdated: (notes: string) => void
};

export const EditNotes: React.FC<Props> = ({notes, onNotesUpdated}: Props) => {
    const [activeAccordionIndex, setActiveAccordionIndex] = useState<number>(-1);

    function toggleAccordion(event: SyntheticEvent, titleProps: AccordionTitleProps) {
        const index = titleProps.index as number;
        if (index === activeAccordionIndex) setActiveAccordionIndex(-1);
        else setActiveAccordionIndex(index);
    }

    return (
        <Accordion>
            <Accordion.Title
                active={activeAccordionIndex === 0}
                index={0}
                onClick={toggleAccordion}>
                <Header as="h3">
                    <Icon name="dropdown"/> My Notes
                </Header>
            </Accordion.Title>

            <Accordion.Content active={activeAccordionIndex === 0}>
                <Grid columns='equal'>
                    <Grid.Row>
                        <Grid.Column>
                            <Header as="h3">
                                <Header.Subheader>Here you can add any certifications, aspirations, side projects or
                                    anything else of interest. You can use <a
                                        href="https://www.markdownguide.org/basic-syntax/" target="_blank"
                                        rel="noreferrer">Markdown</a> to format your notes. </Header.Subheader>
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <Form.TextArea maxLength={2000} fluid value={notes} placeholder="Type notes here"
                                           onChange={event => onNotesUpdated(event.target.value)} style={{height: 200}}>
                            </Form.TextArea>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Segment style={{overflow: 'auto', height: 200}}>
                                <ReactMarkdown>{notes ?? ''}</ReactMarkdown>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Accordion.Content>
        </Accordion>

    );
};