import {ProfileSkill, skills} from "./ProfileSkill";
import React, {SyntheticEvent, useState} from "react";
import {Dropdown, DropdownItemProps, Form} from "semantic-ui-react";

type Props = {
    onSkillAdded: (skill: ProfileSkill) => void;
    addedSkills: ProfileSkill[];
};

export const SkillSelector: React.FC<Props> = ({onSkillAdded, addedSkills}) => {
    const [name, setName] = useState<string | undefined>();
    const [level, setLevel] = useState<number | undefined>();

    const updateName = (event: SyntheticEvent, data: DropdownItemProps) => setName(data.value as string);

    const updateLevel = (event: SyntheticEvent, data: DropdownItemProps) => setLevel(data.value as number);

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

    const getAvailableSkillNames = (): string[] => {
        const addedSkillNames = addedSkills.flatMap(addedSkill => addedSkill.name);
        return skills.filter(skill => !addedSkillNames.includes(skill));
    };

    return (
        <>
            <Form.Dropdown placeholder='Select Skill' selection text={name}>
                <Dropdown.Menu>
                    {getAvailableSkillNames().map(skill =>
                        <Dropdown.Item key={skill} text={skill} value={skill} onClick={updateName}/>
                    )}
                </Dropdown.Menu>
            </Form.Dropdown>

            <Form.Dropdown placeholder='Select Level' selection text={level?.toString()} disabled={!name}>
                <Dropdown.Menu>
                    <Dropdown.Item text="1" description="I've just started learning this" value='1'
                                   onClick={updateLevel}/>
                    <Dropdown.Item text="2" description="TBA" value='2' onClick={updateLevel}/>
                    <Dropdown.Item text="3" description="TBA" value='3' onClick={updateLevel}/>
                    <Dropdown.Item text="4" description="TBA" value='4' onClick={updateLevel}/>
                    <Dropdown.Item text="5" description="I could talk about this at a conference" value='5'
                                   onClick={updateLevel}/>
                </Dropdown.Menu>
            </Form.Dropdown>

            <Form.Button onClick={addSkill} disabled={!level}>Add Skill</Form.Button>
        </>
    );
};