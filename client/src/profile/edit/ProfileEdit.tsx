import {ProfileClient} from "../shared/resource";
import {AuthenticatedUserStore} from "../../shared/authentication/persistence";
import React, {useEffect, useState} from "react";
import {Profile} from "skillset";
import {Form, Message} from "semantic-ui-react";
import {ProfileSkill} from "./ProfileSkill";
import {EditSkills} from "./skills/EditSkills";

type Props = {
    profileClient: ProfileClient;
    authenticatedUserStore: AuthenticatedUserStore;
};

export const ProfileEdit: React.FC<Props> = ({profileClient, authenticatedUserStore}) => {
    const authenticatedUser = authenticatedUserStore.get();
    const [profile, setProfile] = useState<Profile | undefined>();
    const [skills, setSkills] = useState<ProfileSkill[]>([]);

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

            <EditSkills skills={skills} onSkillsUpdated={updatedSkills => setSkills(updatedSkills)}/>
        </Form>
    );
};