import {ProfileSkill} from "skillset";
import React, {useState} from "react";
import {Button, Grid, Label, Rating} from "semantic-ui-react";
import {LevelSelector} from "./LevelSelector";

type Props = {
    skill: ProfileSkill;
    onSkillUpdated: (skill: ProfileSkill) => void;
    onSkillRemoved: (skill: ProfileSkill) => void;
};

export const EditableProfileSkill: React.FC<Props> = ({skill, onSkillUpdated, onSkillRemoved}) => {
    const [isEditing, setIsEditing] = useState(false);

    const updateLevel = (level: number) => {
        const updatedSkill = {
            name: skill.name,
            level: level
        };
        onSkillUpdated(updatedSkill);
        setIsEditing(false);
    };

    return (
        <Grid columns={4} verticalAlign={"middle"}>
            <Grid.Column>
                <Label size="huge">{skill.name}</Label>
            </Grid.Column>

            <Grid.Column>
                {isEditing
                    ? <LevelSelector isDisabled={false} selectedLevel={skill.level} onLevelSelected={updateLevel}/>
                    : <Rating defaultRating={skill.level} maxRating={5} size="huge" disabled/>}
            </Grid.Column>

            <Grid.Column>
                {isEditing
                    ? <Button onClick={() => setIsEditing(false)}>Cancel</Button>
                    : <Button icon="edit" aria-label='Edit' color="blue" onClick={() => setIsEditing(true)}/>
                }
            </Grid.Column>

            <Grid.Column>
                <Button icon="delete" aria-label='Delete' color="red" onClick={() => onSkillRemoved(skill)}/>
            </Grid.Column>
        </Grid>
    );
};