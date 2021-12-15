import React, {SyntheticEvent} from "react";
import {Dropdown, DropdownItemProps} from "semantic-ui-react";
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
        <Dropdown className="selection role-selector" placeholder='Select Role' text={role}>
            <Dropdown.Menu>
                {roles.map(role =>
                    <Dropdown.Item key={role} text={role} value={role} onClick={updateRole}/>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
};