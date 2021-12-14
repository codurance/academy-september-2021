import {ProfileClient} from "../shared/resource";
import React, {useEffect, useState} from "react";
import {Profile, ProfileAvailability, ProfileSkill} from "skillset";
import {Button, Dimmer, Form, Header, Loader} from "semantic-ui-react";
import {EditSkills} from "./skills/EditSkills";
import {ProfileEditState} from "./ProfileEditState";
import {AuthenticatedUserService} from "../../shared/authentication/service/AuthenticatedUserService";
import {EditAvailability} from "./availability/EditAvailability";
import {EditAbout} from "./about/EditAbout";
import "./ProfileEdit.css";
import {ProfileEditFeedback} from "./feedback/ProfileEditFeedback";

type Props = {
    profileClient: ProfileClient;
    authenticatedUserService: AuthenticatedUserService;
    windowView: Window
};

export const ProfileEdit: React.FC<Props> = ({profileClient, authenticatedUserService, windowView}) => {
    const authenticatedUser = authenticatedUserService.getAuthenticatedUser()!; // eslint-disable-line @typescript-eslint/no-non-null-assertion
    const [profileEditState, setProfileEditState] = useState<ProfileEditState>(ProfileEditState.PERFORMING_NETWORK_REQUEST);
    const [availability, setAvailability] = useState<ProfileAvailability>({
        isAvailable: true,
        client: undefined
    });
    const [skills, setSkills] = useState<ProfileSkill[]>([]);
    const [role, setRole] = useState<string>('');
    const [location, setLocation] = useState<string>('');

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
        setSkills(profile.skills);
        setRole(profile.role);
        setLocation(profile.location);
        setAvailability(profile.availability);
        setProfileEditState(ProfileEditState.PROFILE_EDIT_READY);
    };

    const saveProfile = () => {
        setProfileEditState(ProfileEditState.PERFORMING_NETWORK_REQUEST);
        const updatedProfile = {
            skills,
            role,
            availability,
            location
        };

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
                    role={role}
                    onRoleSelected={updatedRole => setRole(updatedRole)}
                    location={location}
                    onLocationSelected={updatedLocation => setLocation(updatedLocation)}
                />
            </div>

            <div className="section">
                <EditAvailability availability={availability}
                                  onAvailabilityUpdated={updatedAvailability => setAvailability(updatedAvailability)}/>
            </div>

            <div className="section">
                <EditSkills skills={skills} onSkillsUpdated={updatedSkills => setSkills(updatedSkills)}/>
            </div>

            <div className="section" style={{textAlign: 'center'}}>
                <Button size='huge' color='green' onClick={saveProfile}>Save</Button>
            </div>
        </Form>
    );
};