import {ProfileClient} from "../shared/resource";
import React, {useEffect, useState} from "react";
import {Profile, ProfileSkill} from "skillset";
import {Button, Checkbox, Dimmer, Form, Loader, Message} from "semantic-ui-react";
import {EditSkills} from "./skills/EditSkills";
import {ProfileEditState} from "./ProfileEditState";
import {AuthenticatedUserService} from "../../shared/authentication/service/AuthenticatedUserService";
import {RoleSelector} from "./roles/RoleSelector";

type Props = {
    profileClient: ProfileClient;
    authenticatedUserService: AuthenticatedUserService;
    windowView: Window
};

export const ProfileEdit: React.FC<Props> = ({profileClient, authenticatedUserService, windowView}) => {
    const authenticatedUser = authenticatedUserService.getAuthenticatedUser()!; // eslint-disable-line @typescript-eslint/no-non-null-assertion
    const [profile, setProfile] = useState<Profile | undefined>();
    const [skills, setSkills] = useState<ProfileSkill[]>([]);
    const [role, setRole] = useState<string>('');
    const [isAvailable, setIsAvailable] = useState<boolean>(false);
    const [currentClient, setCurrentClient] = useState<string | undefined>(undefined);
    const [profileEditState, setProfileEditState] = useState<ProfileEditState>(ProfileEditState.PERFORMING_NETWORK_REQUEST);

    useEffect(() => {
        profileClient
            .getProfile(authenticatedUser.email)
            .then(profile => {
                if (profile) updateForm(profile);
            })
            .finally(() => setProfileEditState(ProfileEditState.PROFILE_EDIT_READY));
    }, []);

    const updateForm = (profile: Profile) => {
        setProfile(profile);
        setSkills(profile.skills);
        setRole(profile.role);
        setIsAvailable(profile.isAvailable);
        setCurrentClient(profile.currentClient);
    };

    const saveProfile = () => {
        setProfileEditState(ProfileEditState.PERFORMING_NETWORK_REQUEST);
        const updatedProfile = {
            skills,
            role,
            isAvailable,
            currentClient
        };

        profileClient
            .save(updatedProfile)
            .then(() => setProfileEditState(ProfileEditState.PROFILE_SAVED))
            .catch(() => setProfileEditState(ProfileEditState.NETWORK_ERROR))
            .finally(() => {
                windowView.scrollTo({top: 0, behavior: 'smooth'});
            });
    };

    const onRoleUpdate = (role: string) => {
        setRole(role);
    };

    return (
        <Form>
            <Dimmer inverted active={profileEditState === ProfileEditState.PERFORMING_NETWORK_REQUEST}>
                <Loader/>
            </Dimmer>

            {!profile && profileEditState === ProfileEditState.PROFILE_EDIT_READY &&
            <Message info>
                <Message.Header>It looks like this is your first time creating a profile</Message.Header>
                <p>Save your details below to be shown in search results</p>
                <p>If you don&apos;t want to be shown in search results you do not need to save this form. You can still
                    search for profiles.</p>
            </Message>
            }

            {profileEditState === ProfileEditState.PROFILE_SAVED &&
            <Message positive>Profile Saved</Message>
            }

            {profileEditState === ProfileEditState.NETWORK_ERROR &&
            <Message negative>Unable to save profile, please try again</Message>
            }

            <Form.Group widths='equal'>
                <Form.Input fluid label='Name' value={profile?.name ?? authenticatedUser.name} readOnly/>
                <Form.Input fluid label='Email' value={profile?.email ?? authenticatedUser.email} readOnly/>
            </Form.Group>
            <RoleSelector onRoleUpdate={onRoleUpdate} />
            <EditSkills skills={skills} onSkillsUpdated={updatedSkills => setSkills(updatedSkills)}/>
            <Form.Group style={{paddingLeft: "7px"}}>
                <Checkbox
                    label='Tick this checkbox if you are currently available to be placed onto a client'
                    checked={isAvailable}
                    onClick={() => {setIsAvailable(!isAvailable); !isAvailable && setCurrentClient(undefined);}}
                />
            </Form.Group>
            { !isAvailable &&
                <Form.Group widths='equal'>
                    <Form.Input fluid label='Current Client' value={isAvailable ? "On the bench" : currentClient}
                                onChange={e => setCurrentClient(e.target.value)} readOnly={isAvailable}/>
                </Form.Group>
            }
            <div style={{marginTop: '3rem', textAlign: 'center'}}>
                <Button size='huge' color='green' onClick={saveProfile}>Save</Button>
            </div>
        </Form>
    );
};