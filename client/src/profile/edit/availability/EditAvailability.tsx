import {Form, Header} from "semantic-ui-react";
import React from "react";
import {ProfileAvailability} from "skillset";

type Props = {
    availability: ProfileAvailability;
    onAvailabilityUpdated: (availability: ProfileAvailability) => void;
};

export const EditAvailability: React.FC<Props> = ({availability, onAvailabilityUpdated}) => {
    const toggleAvailability = () => {
        const isAvailable = !availability.isAvailable;
        if (isAvailable) updateAvailability(true, undefined);
        else updateAvailability(false, availability.client);
    };

    const updateAvailability = (isAvailable: boolean, client: string | undefined) => {
        onAvailabilityUpdated({isAvailable, client});
    };

    const updateClient = (client: string) => {
        updateAvailability(availability.isAvailable, client);
    };

    return (
        <>
            <Header as="h3">My Availability</Header>
            <Form.Group inline widths="equal">
                <Form.Field>
                    <Form.Checkbox
                        label='I am able available to be placed onto a client'
                        checked={availability.isAvailable}
                        onClick={() => toggleAvailability()}/>
                </Form.Field>

                <Form.Field>
                    {!availability.isAvailable &&
                    <Form.Input
                        fluid
                        label='Current Client'
                        value={availability.client || ''}
                        onChange={event => updateClient(event.target.value)}/>}
                </Form.Field>
            </Form.Group>
        </>
    );
};