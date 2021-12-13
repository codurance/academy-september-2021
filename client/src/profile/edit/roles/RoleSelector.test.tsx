import {render, screen} from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";
import {RoleSelector} from "./RoleSelector";

describe('role selector should', () => {
    it('set role to role selected in the dropdown menu when an option except for other is selected', () => {
        let role = '';
        const updateRole = (updatedRole: string) => {
            role = updatedRole;
        };
        render(<RoleSelector onRoleUpdate={updateRole} />);
        clickInput('Select Role');
        clickInput('Software Craftsperson');

        expect(role).toEqual('Software Craftsperson');
    });

    it('not set role to role selected in the dropdown menu when other is selected', () => {
        let role = '';
        const updateRole = (updatedRole: string) => {
            role = updatedRole;
        };
        render(<RoleSelector onRoleUpdate={updateRole} />);
        clickInput('Select Role');
        clickInput('Other');

        expect(role).toEqual('');
    });

    it('allows users to type a role into the input field if they select other', () => {
        render(<RoleSelector onRoleUpdate={() => {return;}} />);

        expect(screen.queryByText('Custom Role')).not.toBeInTheDocument();

        clickInput('Select Role');
        clickInput('Other');

        expect(screen.queryByText('Custom Role')).toBeInTheDocument();
    });

    it('saves down custom roles when users input roles into custom role field', () => {
        let role = '';
        const updateRole = (updatedRole: string) => {
            role = updatedRole;
        };
        render(<RoleSelector onRoleUpdate={updateRole} />);
        clickInput('Select Role');
        clickInput('Other');
        typeValueIntoInputByLabel('Custom Role', 'Founder');

        expect(role).toEqual('Founder');
    });

    const clickInput = (text: string) => {
        const input = screen.getByText(text);
        userEvent.click(input);
    };

    const typeValueIntoInputByLabel = (label: string, value: string) => {
        const labelElement = screen.getByText(label);
        const field = labelElement.parentElement;
        const input = field?.querySelector('input');

        input && userEvent.clear(input);
        input && userEvent.type(input, value);
    };
});