import {ProfileClient} from "../shared/resource";
import {AuthenticatedUserStore} from "../../shared/authentication/persistence";
import React, {useEffect, useState} from "react";
import {Profile, ProfileSkill} from "skillset";
import {Button, Dimmer, Form, Loader, Message} from "semantic-ui-react";
import {EditSkills} from "./skills/EditSkills";
import {ProfileSaveResponse} from "./ProfileSaveResponse";

type Props = {
    profileClient: ProfileClient;
    authenticatedUserStore: AuthenticatedUserStore;
    windowView: Window
};

export const ProfileEdit: React.FC<Props> = ({profileClient, authenticatedUserStore, windowView}) => {
    const authenticatedUser = authenticatedUserStore.get()!; // eslint-disable-line @typescript-eslint/no-non-null-assertion
    const [profile, setProfile] = useState<Profile | undefined>();
    const [skills, setSkills] = useState<ProfileSkill[]>([]);
    const [isPerformingNetworkRequest, setIsPerformingNetworkRequest] = useState(true);
    const [profileSaveResponse, setProfileSaveResponse] = useState<ProfileSaveResponse | undefined>(undefined);

    useEffect(() => {
        profileClient
            .getProfile(authenticatedUser.email)
            .then(profile => {
                if (profile) updateForm(profile);
            })
            .finally(() => setIsPerformingNetworkRequest(false));
    }, []);

    const updateForm = (profile: Profile) => {
        setProfile(profile);
        setSkills(profile.skills);
    };

    const saveProfile = () => {
        setIsPerformingNetworkRequest(true);
        const updatedProfile = {
            skills
        };

        profileClient
            .save(updatedProfile)
            .then(() => setProfileSaveResponse(ProfileSaveResponse.SUCCESS))
            .catch(() => setProfileSaveResponse(ProfileSaveResponse.ERROR))
            .finally(() => {
                setIsPerformingNetworkRequest(false);
                windowView.scrollTo({top: 0, behavior: 'smooth'});
            });
    };

    return (
        <Form>
            <Dimmer inverted active={isPerformingNetworkRequest}>
                <Loader/>
            </Dimmer>

            {!profile && !profileSaveResponse &&
            <Message info>
                <Message.Header>It looks like this is your first time creating a profile</Message.Header>
                <p>Save your details below to be shown in search results</p>
                <p>If you don&apos;t want to be shown in search results you do not need to save this form. You can still
                    search for profiles.</p>
            </Message>
            }

            {profileSaveResponse === ProfileSaveResponse.SUCCESS &&
            <Message positive>Profile Saved</Message>
            }

            {profileSaveResponse === ProfileSaveResponse.ERROR &&
            <Message negative>Unable to save profile, please try again</Message>
            }

            <Form.Group widths='equal'>
                <Form.Input fluid label='Name' value={profile?.name ?? authenticatedUser.name} readOnly/>
                <Form.Input fluid label='Email' value={profile?.email ?? authenticatedUser.email} readOnly/>
            </Form.Group>

            <EditSkills skills={skills} onSkillsUpdated={updatedSkills => setSkills(updatedSkills)}/>

            <div style={{marginTop: '3rem', textAlign: 'center'}}>
                <Button size='huge' color='green' onClick={saveProfile}>Save</Button>
            </div>
        </Form>
    );
};