import React from 'react';
import {Grid, Header, Icon, Image, Modal} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import {Profile} from "skillset";
import './ProfileModal.css';

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

            <Grid padded>
                <Grid.Row>
                    <Grid.Column width="4">
                        <Image src={profile.imageUrl} rounded size="medium" alt="Profile Image"/>
                    </Grid.Column>

                    <Grid.Column width="10" verticalAlign="middle">
                        <Header as="h1">{profile.name}</Header>
                    </Grid.Column>

                    <Grid.Column width="2" textAlign="right">
                        <Icon name="x" size="big"/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width="8">
                        <Grid.Row>
                            <Header as="h3">
                                {profile.availability.isAvailable
                                    ? <>
                                        <Grid.Column>
                                            <Icon name="check circle" color="green" size="big"/>
                                        </Grid.Column>

                                        <Grid.Column>
                                            <span>Available</span>
                                        </Grid.Column>
                                    </>
                                    : <Grid.Column><Icon name="minus circle" color="red"
                                                         size="big"/>{profile.availability.client}</Grid.Column>
                                }
                            </Header>
                        </Grid.Row>

                        <Grid.Row>
                            <Header as="h5" style={{wordWrap: 'break-word'}}>
                                <Icon name="male" size="big"/> {profile.role}
                            </Header>
                        </Grid.Row>

                        <Grid.Row>
                            <Header as="h5">
                                <Icon name="home" size="big"/> {profile.location}
                            </Header>
                        </Grid.Row>
                    </Grid.Column>

                    <Grid.Column width="8">

                    </Grid.Column>
                </Grid.Row>
            </Grid>


            {/*
            <Modal.Header id={'modalHeader'}>{profile.name}</Modal.Header>
            <Modal.Content image>
                <div style={{display: 'flex', flexDirection: 'column', paddingRight: '3rem'}}>
                    <div className="ui small image" >
                        <img alt="profile image" style={{borderRadius: "5%"}} src={profile.imageUrl} />
                    </div>
                    <p style={{paddingTop: '1rem'}}>{profile.email}</p>
                    <div>
                        {profile.availability.isAvailable
                            ? <Icon data-testid={"available"} className={"check circle green"}/>
                            : <Icon data-testid={"unavailable"} className={"minus circle red"}/>
                        }
                        <span>{profile.availability.client}</span>
                    </div>
                </div>
                <Modal.Description>
                    <Header>About me</Header>
                    <span>{`${profile.role} - ${profile.location}`}</span>

                    <Header>Skills</Header>
                    <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: '80%'}}>
                        {profile.skills.map(skill => (
                            <div key={skill.name} style={{paddingRight: '.5rem', paddingBottom: '.2rem'}}>
                                <span>{skill.name}</span>
                                <Rating data-testid={"rating"} defaultRating={skill.level} maxRating={5} size="mini" disabled/>
                            </div>
                        ))}
                    </div>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => setIsVisible(false)}>
                    Close
                </Button>
            </Modal.Actions>*/}</Modal>
    );
};