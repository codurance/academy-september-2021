import {ProfileClient} from "../shared/resource";
import {AuthenticatedUserStore} from "../../shared/authentication/persistence";
import React, {useEffect, useState} from "react";
import {Profile} from "skillset";
import {Form, Grid, Message, Rating} from "semantic-ui-react";
import {SkillSelector} from "./SkillSelector";
import {ProfileSkill} from "./ProfileSkill";

type Props = {
    profileClient: ProfileClient;
    authenticatedUserStore: AuthenticatedUserStore;
};

export const ProfileEdit: React.FC<Props> = ({profileClient, authenticatedUserStore}) => {
    const authenticatedUser = authenticatedUserStore.get();
    const [profile, setProfile] = useState<Profile | undefined>();
    const [newSkills, setNewSkills] = useState<ProfileSkill[]>([]);

    useEffect(() => {
        profileClient
            .getSavedProfile()
            .then(profile => {
                if (profile) setProfile(profile);
            })
            .catch(() => console.log('Unable to get profile'));
    }, []);

    return (
        <Form>
            {!profile &&
            <Message info>
                <Message.Header>It looks like this is your first time creating a profile</Message.Header>
                <p>Save your details below to be shown in search results</p>
                <p>If you don&apos;t want to be shown in search results you do not need to save this form. You can still
                    search for profiles.</p>
            </Message>
            }

            <Form.Group widths='equal'>
                <Form.Input fluid label='Name' value={profile?.name ?? authenticatedUser?.name} readOnly/>
                <Form.Input fluid label='Email' value={profile?.email ?? authenticatedUser?.email} readOnly/>
            </Form.Group>

            <Grid columns={3} padded='vertically'>
                <Grid.Row>
                {newSkills.map(skill =>
                    <Grid.Column key={skill.name}>
                        <label>{skill.name}</label>
                        <Rating defaultRating={skill.level} maxRating={5} size='huge' disabled/>
                    </Grid.Column>
                )}
                </Grid.Row>
            </Grid>

            <Form.Group widths='equal'>
                <SkillSelector onSkillAdded={newSkill => setNewSkills(skills => [...skills, newSkill])} addedSkills={newSkills}/>
            </Form.Group>
        </Form>
    );
};