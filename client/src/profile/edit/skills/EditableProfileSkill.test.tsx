import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import {EditableProfileSkill} from "./EditableProfileSkill";
import {ProfileSkill} from "skillset";

describe('editable profile skill should', () => {
    let updatedSkill: ProfileSkill = {} as ProfileSkill;
    let removedSkill: ProfileSkill = {} as ProfileSkill;

    const updateSkill = (skill: ProfileSkill) => {
        updatedSkill = skill;
    };
    const updateRemovedSkill = (skill: ProfileSkill) => {
        removedSkill = skill;
    };
    const addedSkill = {
        name: 'TypeScript',
        level: 4
    };

    beforeEach(() => {
        render(<EditableProfileSkill skill={addedSkill} onSkillUpdated={updateSkill} onSkillRemoved={updateRemovedSkill} />);
    });

    it('do nothing when editing skill is cancelled', () => {
        clickIconButton('Edit');
        clickInput('Cancel');

        expect(updatedSkill).toEqual({});
    });

    it('allow rating to be updated', () => {
        clickIconButton('Edit');
        selectDropdownValue('4', '5');

        expect(updatedSkill).toEqual({name: 'TypeScript', level: 5});
    });

    it('reset editable state when skill updated', () => {
        clickIconButton('Edit');
        selectDropdownValue('4', '1');

        expect(screen.getByLabelText('Edit')).toBeInTheDocument();
    });

    it('allow skill to be removed', () => {
        clickIconButton('Delete');

        expect(removedSkill).toEqual(addedSkill);
    });

    const clickIconButton = (label: string) => {
        const button = screen.getByLabelText(label);
        userEvent.click(button);
    };

    const selectDropdownValue = (currentSelection: string, newSelection: string) => {
        const dropdown = screen.getAllByText(currentSelection)[0];
        userEvent.click(dropdown);
        clickInput(newSelection);
    };

    const clickInput = (text: string) => {
        const input = screen.getByText(text);
        userEvent.click(input);
    };
});