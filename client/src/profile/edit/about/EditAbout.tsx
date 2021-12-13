import {Form, Header, Input} from "semantic-ui-react";
import React from "react";
import {RoleSelector} from "./RoleSelector";

type Props = {
    role: string;
    onRoleSelected: (role: string) => void;
};

export const EditAbout: React.FC<Props> = ({role, onRoleSelected}) =>
    <>
        <Header as="h3">About Me</Header>
        <Form.Group widths='equal'>
            <Form.Field>
                <label>Role</label>
                <RoleSelector role={role} onRoleSelected={onRoleSelected}/>
            </Form.Field>

            <Form.Field>
                <label>Location</label>
                <Input fluid placeholder='Select Office' disabled/>
            </Form.Field>
        </Form.Group>
    </>;