import React, {SyntheticEvent, useState} from "react";
import {ProfileSkill} from "skillset";
import {Accordion, AccordionTitleProps, Container, Form, Header, Icon, Segment} from "semantic-ui-react";
import {EditableProfileSkill} from "./EditableProfileSkill";
import {SkillSelector} from "./SkillSelector";

type Props = {
    skills: ProfileSkill[];
    onSkillsUpdated: (skills: ProfileSkill[]) => void;
};

export const EditSkills: React.FC<Props> = ({skills, onSkillsUpdated}) => {
    const [activeAccordionIndex, setActiveAccordionIndex] = useState<number>(-1);


    const addSkill = (addedSkill: ProfileSkill) => {
        const updatedSkills = [...skills, addedSkill];
        onSkillsUpdated(updatedSkills);
    };

    const updateSkill = (updatedSkill: ProfileSkill) => {
        const updatedSkills = [...skills];
        const updatedSkillIndex = skills.findIndex(skill => skill.name === updatedSkill.name);
        updatedSkills[updatedSkillIndex] = updatedSkill;
        onSkillsUpdated(updatedSkills);
    };

    function toggleAccordion(event: SyntheticEvent, titleProps: AccordionTitleProps) {
        const index = titleProps.index as number;
        if (index === activeAccordionIndex) setActiveAccordionIndex(-1);
        else setActiveAccordionIndex(index);
    }

    const removeSkill = (removedSkill: ProfileSkill) => {
        const updatedSkills = [...skills];
        const updatedSkillIndex = skills.findIndex(skill => skill.name === removedSkill.name);
        updatedSkills.splice(updatedSkillIndex, 1);
        onSkillsUpdated(updatedSkills);
    };

    return (
        <>
            <Accordion>
                <Accordion.Title
                    active={activeAccordionIndex === 0}
                    index={0}
                    onClick={toggleAccordion}>
                    <Header as="h3">
                        <Icon name="dropdown"/> My Skills
                    </Header>
                </Accordion.Title>

                <Accordion.Content active={activeAccordionIndex === 0}>
                    {skills.map(skill => <Container textAlign={"center"} key={skill.name}>
                            <Segment>
                                <EditableProfileSkill skill={skill}
                                                      onSkillUpdated={updateSkill}
                                                      onSkillRemoved={removeSkill}/>
                            </Segment>
                        </Container>
                    )}

                    <Form.Group widths='equal' style={{paddingTop: '2em'}}>
                        <SkillSelector onSkillAdded={addSkill} addedSkills={skills}/>
                    </Form.Group>
                </Accordion.Content>
            </Accordion>
        </>
    );
};