import React, {SyntheticEvent, useState} from "react";
import {Dropdown, Form} from "semantic-ui-react";
import {roles} from "./ProfileRole";

type Props = {
    onRoleUpdate: (role: string) => void;
};

export const RoleSelector: React.FC<Props> = ({onRoleUpdate}: Props) => {

    const [role, setRole] = useState<string>('');
    const [inputRole, setInputRole] = useState<string>('');

    const onDropdownSelectionChange = (event: SyntheticEvent, selectedRole: string) => {
        setRole(selectedRole);
        if(selectedRole === 'Other') return;
        onRoleUpdate(selectedRole);
    };

    return <>
        <Form>
            <Form.Field>
                <Dropdown className="selection" placeholder='Select Role' text={role}>
                    <Dropdown.Menu>
                        {roles.map(role =>
                            <Dropdown.Item key={role} text={role} value={role} onClick={(e, data) => onDropdownSelectionChange(e, data.value as string)}/>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
            </Form.Field>
            {(role === 'Other') && <Form.Group>
                <Form.Input fluid label='Custom Role' value={inputRole}
                            onChange={e => {onRoleUpdate(e.target.value); setInputRole(e.target.value);}}/>
            </Form.Group>}
        </Form>
    </>;
};