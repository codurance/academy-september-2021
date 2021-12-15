import React from 'react';
import {Grid, Header, Icon, Image, Modal} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import {Profile} from "skillset";
import {ProfileModalAbout} from "./ProfileModalAbout";
import {ProfileModalSkills} from "./ProfileModalSkills";
import profileModalBackground from "./profile-modal-background.svg";

type Props = {
    profile: Profile,
    isVisible: boolean,
    onModalClosed: () => void;
};

export const ProfileModal: React.FC<Props> = ({profile, isVisible, onModalClosed}: Props) =>
    <Modal
        onClose={onModalClosed}
        open={isVisible}
        size="large"
        dimmer="blurring"
        style={{backgroundImage: `url(${profileModalBackground})`, backgroundSize: 'cover'}}>
        <Grid padded>
            <Grid.Row>
                <Grid.Column width="4">
                    <Image src={profile.imageUrl} rounded size="medium" alt="Profile Image"/>
                </Grid.Column>

                <Grid.Column width="10" verticalAlign="middle">
                    <Header as="h1" inverted>{profile.name}</Header>
                </Grid.Column>

                <Grid.Column width="2" textAlign="right">
                    <div onClick={onModalClosed}>
                        <Icon name="x" size="big" aria-label="Close" inverted style={{cursor: 'pointer'}}/>
                    </div>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width="4">
                    <ProfileModalAbout profile={profile}/>
                </Grid.Column>

                <Grid.Column width="12">
                    <ProfileModalSkills skills={profile.skills}/>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </Modal>;