import React from 'react';
import {Button, Header, Icon, Image, Modal, Rating} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import {Profile} from "skillset";

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
        >
            <Modal.Header>{profile.name}</Modal.Header>
            <Modal.Content image>
                <Image alt={'profile image'} size='medium' src={profile.imageUrl} wrapped />
                <Modal.Description>
                    <Header>About me</Header>
                    <span>{`${profile.role} - ${profile.location}`}</span>
                    <p>{profile.email}</p>
                    <div>
                    {profile.availability.isAvailable
                        ? <Icon data-testid={"available"} className={"check circle green"}/>
                        : <Icon data-testid={"unavailable"} className={"minus circle red"}/>
                    }
                    <span>{profile.availability.client}</span>
                    </div>
                    <Header>Skills</Header>
                    {profile.skills.map(skill => (
                        <div key={skill.name}>
                            <span>{skill.name}</span>
                            <Rating data-testid={"rating"} defaultRating={skill.level} maxRating={5} size="huge" disabled/>
                        </div>
                    ))}
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