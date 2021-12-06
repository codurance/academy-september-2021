import {ProfileClient} from "../shared/resource";
import {AuthenticatedUserStore} from "../../shared/authentication/persistence";
import React, {useEffect, useState} from "react";
import {Profile} from "skillset";
import {Container, Form, Message, Segment} from "semantic-ui-react";
import {SkillSelector} from "./SkillSelector";
import {ProfileSkill} from "./ProfileSkill";
import {EditableProfileSkill} from "./skill/EditableProfileSkill";

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

    const updateSkill = (updatedSkill: ProfileSkill) => {
        const persistedSkills = [...newSkills];
        const persistedSkillIndex = newSkills.findIndex(skill => skill.name === updatedSkill.name);
        persistedSkills[persistedSkillIndex] = updatedSkill;
        setNewSkills(persistedSkills);
    };

    const removeSkill = (removedSkill: ProfileSkill) => {
        const persistedSkills = [...newSkills];
        const persistedSkillIndex = newSkills.findIndex(skill => skill.name === removedSkill.name);
        persistedSkills.splice(persistedSkillIndex, 1);
        setNewSkills(persistedSkills);
    };

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


            <div style={{padding: '2em 0 2em 0'}}>
                {newSkills.map(skill =>
                    <Container textAlign={"center"} key={skill.name}>
                        <Segment>
                            <EditableProfileSkill skill={skill} onSkillUpdated={updateSkill}
                                                  onSkillRemoved={removeSkill}/>
                        </Segment>
                    </Container>
                )}
            </div>

            <Form.Group widths='equal'>
                <SkillSelector onSkillAdded={newSkill => setNewSkills(skills => [...skills, newSkill])}
                               addedSkills={newSkills}/>
            </Form.Group>
        </Form>
    );
};