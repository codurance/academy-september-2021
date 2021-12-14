import React from 'react';
import {Button, Header, Icon, Image, Modal} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import {Profile} from "skillset";
import profileCardBackground from "./profile-card-background.svg";

type Props = {
    profile: Profile,
    isVisible: boolean,
    setIsVisible: (isVisible: boolean) => void;
};

export const ProfileModal: React.FC<Props> = ({profile, isVisible, setIsVisible}: Props) => {

    return (
        <Modal
            onClose={() => setIsVisible(false)}
            onOpen={() => setIsVisible(true)}
            open={isVisible}
            style={{backgroundImage: `url(${profileCardBackground})`, backgroundSize: 'cover'}}
        >
            <Modal.Header>{profile.name}</Modal.Header>
            <Modal.Content image>
                <Image size='tiny' src={profile.imageUrl} wrapped />
                {profile.availability.isAvailable
                    ? <Icon className={"check circle green"}/>
                    : <Icon className={"minus circle red"}/>
                }
                <span>
                    {profile.availability.isAvailable
                        ? 'Available'
                        : profile.availability.client
                    }
                </span>
                <span>{profile.email}</span>
                <Modal.Description>
                    <Header>About me</Header>
                    <span>{`${profile.role} - ${profile.location}`}</span>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => setIsVisible(false)}>
                    Close
                </Button>
            </Modal.Actions>
        </Modal>
    );
};