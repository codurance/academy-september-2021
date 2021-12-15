import {ProfileSkill} from "skillset";
import {skills} from "../ProfileSkill";
import React, {SyntheticEvent, useState} from "react";
import {Dropdown, DropdownItemProps, DropdownProps, Form, Input} from "semantic-ui-react";
import "./SkillSelector.css";
import {LevelSelector} from "./LevelSelector";

type Props = {
    onSkillAdded: (skill: ProfileSkill) => void;
    addedSkills: ProfileSkill[];
};

export const SkillSelector: React.FC<Props> = ({onSkillAdded, addedSkills}) => {
    const [name, setName] = useState<string | undefined>();
    const [level, setLevel] = useState<number | undefined>();

    const updateName = (event: SyntheticEvent, data: DropdownProps) => setName(data.value as string);

    const updateLevel = (level: number) => setLevel(level);

    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    const addSkill = () => {
        const skillAdded = {
            name: name!,
            level: level!
        };
        onSkillAdded(skillAdded);
        setName(undefined);
        setLevel(undefined);
    };
    /* eslint-enable @typescript-eslint/no-non-null-assertion */

    const getAvailableSkillSelectionDropdownOptions = (): {key: string, value: string, text: string}[] => {
        const addedSkillNames = addedSkills.flatMap(addedSkill => addedSkill.name);
        return skills
            .filter(skill => !addedSkillNames.includes(skill))
            .map( skill => ({key: skill, value: skill, text: skill}));
    };

    return (
        <>
            <Form.Field>
                <Dropdown
                    placeholder='Select Skill'
                    text={name}
                    value={name}
                    onChange={updateName}
                    fluid
                    selection
                    search
                    options={getAvailableSkillSelectionDropdownOptions()}
                />
            </Form.Field>

            <Form.Field>
                <LevelSelector isDisabled={!name} selectedLevel={level} onLevelSelected={updateLevel} />
            </Form.Field>

            <Form.Button onClick={addSkill} disabled={!level}>Add Skill</Form.Button>
        </>
    );
};