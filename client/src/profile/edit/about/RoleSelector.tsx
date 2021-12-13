import React, {SyntheticEvent} from "react";
import {Dropdown, DropdownItemProps, Form} from "semantic-ui-react";
import {roles} from "./ProfileRole";

type Props = {
    role: string;
    onRoleSelected: (role: string) => void;
};

export const RoleSelector: React.FC<Props> = ({role, onRoleSelected}: Props) => {
    const updateRole = (event: SyntheticEvent, data: DropdownItemProps) => {
        const newRole = data.value as string;
        onRoleSelected(newRole);
    };

    return (
        <Form.Dropdown className="selection" placeholder='Select Role' text={role}>
            <Dropdown.Menu>
                {roles.map(role =>
                    <Dropdown.Item key={role} text={role} value={role} onClick={updateRole}/>
                )}
            </Dropdown.Menu>
        </Form.Dropdown>
    );
};