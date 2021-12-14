import React from 'react';
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import {ProfileCard} from "./ProfileCard";
import {Profile} from "skillset";

type Props = {
    profile: Profile
};

export const ProfileModal: React.FC<Props> = ({profile}: Props) => {
    const [open, setOpen] = React.useState(false);

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<ProfileCard profile={profile}/>}
        >
            <Modal.Header>{profile.name}</Modal.Header>
            <Modal.Content image>
                <Image size='medium' src={profile.imageUrl} wrapped />
                <Modal.Description>
                    <Header>About me</Header>
                    <span>{`${profile.role} - ${profile.location}`}</span>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => setOpen(false)}>
                    Close
                </Button>
            </Modal.Actions>
        </Modal>
    );
};