import {Form} from "semantic-ui-react";
import React from "react";


type Props = {
    notes: string,
    onNotesUpdated: (notes: string) => void
}

export const EditNotes: React.FC<Props> = ({notes, onNotesUpdated}: Props) => {
    return <Form.Input fluid label='Notes' value={notes} onChange={event => onNotesUpdated(event.target.value)} />;
};