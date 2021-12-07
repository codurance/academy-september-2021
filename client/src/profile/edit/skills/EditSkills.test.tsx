import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import {ProfileSkill} from "../ProfileSkill";
import {EditSkills} from "./EditSkills";

describe('edit skills should', () => {
    let skills: ProfileSkill[];
    const updateSkills = (updatedSkills: ProfileSkill[]) => {
        skills = updatedSkills;
    };

    beforeEach(() => {
        skills = [
            {name: 'TypeScript', level: 5}
        ];
    });

    it('handle adding skills', () => {
        renderEditSkills();

        addSkill('React', '3');

        expect(skills).toEqual([
            {name: 'TypeScript', level: 5},
            {name: 'React', level: '3'}
        ]);
    });

    it('update skills', () => {
        renderEditSkills();

        clickIconButton('Edit');
        selectDropdownWithSelection('5', '4');

        expect(skills).toEqual([
            {name: 'TypeScript', level: '4'},
        ]);
    });

    it('remove skills', async () => {
        renderEditSkills();

        clickIconButton('Delete');

        expect(skills).toEqual([]);
    });

    const renderEditSkills = () => {
        render(<EditSkills skills={skills} onSkillsUpdated={updateSkills}/>);
    };

    const addSkill = (name: string, level: string) => {
        selectDropdownValue('Select Skill', name);
        selectDropdownValue('Select Level', level);
        clickInput('Add Skill');
    };

    const selectDropdownValue = (dropdownPlaceholder: string, selection: string) => {
        clickInput(dropdownPlaceholder);
        clickInput(selection);
    };

    const clickInput = (text: string) => {
        const input = screen.getByText(text);
        userEvent.click(input);
    };

    const clickIconButton = (label: string) => {
        const button = screen.getByLabelText(label);
        userEvent.click(button);
    };

    const selectDropdownWithSelection = (currentSelection: string, newSelection: string) => {
        const dropdown = screen.getAllByText(currentSelection)[0];
        userEvent.click(dropdown);

        const selection = screen.getAllByText(newSelection)[0];
        userEvent.click(selection);
    };
});