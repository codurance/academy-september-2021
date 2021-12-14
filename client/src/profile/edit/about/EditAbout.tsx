import {Form, Header, Input} from "semantic-ui-react";
import React from "react";
import {RoleSelector} from "./RoleSelector";
import {LocationSelector} from "./LocationSelector";

type Props = {
    role: string;
    onRoleSelected: (role: string) => void;
    location: string;
    onLocationSelected: (location: string) => void;
};

export const EditAbout: React.FC<Props> = ({role, onRoleSelected, location, onLocationSelected}) =>
    <>
        <Header as="h3">About Me</Header>
        <Form.Group widths='equal'>
            <Form.Field>
                <label>Role</label>
                <RoleSelector role={role} onRoleSelected={onRoleSelected}/>
            </Form.Field>

            <Form.Field>
                <label>Location</label>
                <LocationSelector location={location} onLocationSelected={onLocationSelected}/>
            </Form.Field>
        </Form.Group>
    </>;