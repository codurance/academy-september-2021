import React from "react";
import {ProfileSkill} from "../ProfileSkill";
import {Container, Form, Segment} from "semantic-ui-react";
import {EditableProfileSkill} from "./EditableProfileSkill";
import {SkillSelector} from "./SkillSelector";

type Props = {
    skills: ProfileSkill[];
    onSkillsUpdated: (skills: ProfileSkill[]) => void;
};

export const EditSkills: React.FC<Props> = ({skills, onSkillsUpdated}) => {
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

    const removeSkill = (removedSkill: ProfileSkill) => {
        const updatedSkills = [...skills];
        const updatedSkillIndex = skills.findIndex(skill => skill.name === removedSkill.name);
        updatedSkills.splice(updatedSkillIndex, 1);
        onSkillsUpdated(updatedSkills);
    };

    return (
        <>
            <div style={{padding: '2em 0 2em 0'}}>
                {skills.map(skill =>
                    <Container textAlign={"center"} key={skill.name}>
                        <Segment>
                            <EditableProfileSkill skill={skill}
                                                  onSkillUpdated={updateSkill}
                                                  onSkillRemoved={removeSkill}/>
                        </Segment>
                    </Container>
                )}
            </div>

            <Form.Group widths='equal'>
                <SkillSelector onSkillAdded={addSkill} addedSkills={skills}/>
            </Form.Group>
        </>
    );
};