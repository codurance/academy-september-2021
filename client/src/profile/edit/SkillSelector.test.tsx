import {render, screen} from "@testing-library/react";
import React from "react";
import {ProfileSkill} from "./ProfileSkill";
import userEvent from "@testing-library/user-event";
import {SkillSelector} from "./SkillSelector";

describe('skill selector should', () => {
    it('disable skill level dropdown if no skill has been selected', () => {
        render(<SkillSelector onSkillAdded={() => {/* do nothing */}}/>);

        expect(screen.getByText('Select Level').parentElement).toHaveAttribute('aria-disabled', 'true');
    });

    it('disable add skill button when no skill level has been selected', () => {
        render(<SkillSelector onSkillAdded={() => {/* do nothing */}}/>);

        expect(screen.getByText('Add Skill')).toBeDisabled();
    });

    it('trigger skill added on valid skill added', () => {
        let skillAdded: ProfileSkill = {} as ProfileSkill;
        const updateSkillAdded = (skill: ProfileSkill) => {
            skillAdded = skill;
        };
        render(<SkillSelector onSkillAdded={updateSkillAdded}/>);

        selectDropdownValue('Select Skill', 'React');
        selectDropdownValue('Select Level', '5');
        clickInput('Add Skill');

        expect(skillAdded).toEqual({name: 'React', level: '5'});
    });

    const selectDropdownValue = (dropdownPlaceholder: string, selection: string) => {
        clickInput(dropdownPlaceholder);
        clickInput(selection);
    };

    const clickInput = (text: string) => {
        const input = screen.getByText(text);
        userEvent.click(input);
    };
});