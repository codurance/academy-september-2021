import {ProfileClient} from "../shared/resource";
import React, {useEffect, useState} from "react";
import {Profile, UpdatedProfile} from "skillset";
import {Button, Dimmer, Form, Header, Loader} from "semantic-ui-react";
import {EditSkills} from "./skills/EditSkills";
import {ProfileEditState} from "./ProfileEditState";
import {AuthenticatedUserService} from "../../shared/authentication/service/AuthenticatedUserService";
import {EditAvailability} from "./availability/EditAvailability";
import {EditAbout} from "./about/EditAbout";
import "./ProfileEdit.css";
import {ProfileEditFeedback} from "./feedback/ProfileEditFeedback";
import {EditNotes} from "./notes/EditNotes";

type Props = {
    profileClient: ProfileClient;
    authenticatedUserService: AuthenticatedUserService;
    windowView: Window
};

export const ProfileEdit: React.FC<Props> = ({profileClient, authenticatedUserService, windowView}) => {
    const authenticatedUser = authenticatedUserService.getAuthenticatedUser()!; // eslint-disable-line @typescript-eslint/no-non-null-assertion
    const [profileEditState, setProfileEditState] = useState<ProfileEditState>(ProfileEditState.PERFORMING_NETWORK_REQUEST);
    const [updatedProfile, setUpdatedProfile] = useState<UpdatedProfile>({
        name: authenticatedUser.name,
        imageUrl: authenticatedUser.profileImageUrl,
        role: '',
        location: '',
        notes: '',
        availability: {
            isAvailable: true,
            client: undefined
        },
        skills: []
    });

    useEffect(() => {
        profileClient
            .getProfile(authenticatedUser.email)
            .then(profile => {
                if (profile) updateForm(profile);
                else setProfileEditState(ProfileEditState.PROFILE_NOT_CREATED);
            })
            .catch(() => setProfileEditState(ProfileEditState.PROFILE_NOT_CREATED));
    }, []);

    const updateForm = (profile: Profile) => {
        setUpdatedProfile({
            ...updatedProfile,
            ...profile
        });
        setProfileEditState(ProfileEditState.PROFILE_EDIT_READY);
    };

    const updateProfile = (name: string, value: unknown) => {
        setUpdatedProfile({
            ...updatedProfile,
            [name]: value
        });
    };

    const saveProfile = () => {
        setProfileEditState(ProfileEditState.PERFORMING_NETWORK_REQUEST);

        profileClient
            .save(updatedProfile)
            .then(() => setProfileEditState(ProfileEditState.PROFILE_SAVED))
            .catch(() => setProfileEditState(ProfileEditState.NETWORK_ERROR))
            .finally(() => {
                windowView.scrollTo({top: 0, behavior: 'smooth'});
            });
    };

    return (
        <Form>
            <Dimmer inverted active={profileEditState === ProfileEditState.PERFORMING_NETWORK_REQUEST}>
                <Loader/>
            </Dimmer>

            <ProfileEditFeedback profileEditState={profileEditState}/>

            <div className="section" style={{marginTop: 0}}>
                <Header as="h3">My Profile</Header>
                <Form.Group widths='equal'>
                    <Form.Input fluid label='Name' value={authenticatedUser.name} readOnly/>
                    <Form.Input fluid label='Email' value={authenticatedUser.email} readOnly/>
                </Form.Group>
            </div>

            <div className="section">
                <EditAbout
                    role={updatedProfile.role}
                    onRoleSelected={role => updateProfile('role', role)}
                    location={updatedProfile.location}
                    onLocationSelected={location => updateProfile('location', location)}
                />
            </div>

            <div className="section">
                <EditAvailability availability={updatedProfile.availability}
                                  onAvailabilityUpdated={availability => updateProfile('availability', availability)}/>
            </div>

            <div className="section">
                <EditSkills skills={updatedProfile.skills} onSkillsUpdated={skills => updateProfile('skills', skills)}/>
            </div>

            <div className="section">
                <EditNotes notes={updatedProfile.notes}
                           onNotesUpdated={notes => updateProfile('notes', notes)} />
            </div>

            <div className="section" style={{textAlign: 'center'}}>
                <Button size='huge' color='green' onClick={saveProfile}>Save</Button>
            </div>
        </Form>
    );
};