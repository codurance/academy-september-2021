import {Profile} from "skillset";
import {Card, Image} from "semantic-ui-react";
import React, {useState} from "react";
import profileCardBackground from "./profile-card-background.svg";
import {ProfileModal} from "./modal/ProfileModal";
import {ProfileCardFooter} from "./ProfileCardFooter";
import {ProfileCardSkills} from "./ProfileCardSkills";

type Props = {
    profile: Profile
    requestedSkills: string[]
};

export const ProfileCard: React.FC<Props> = ({profile, requestedSkills}: Props) => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    return (
        <>
            <ProfileModal profile={profile} isVisible={isModalVisible} onModalClosed={() => setIsModalVisible(false)}/>

            <Card onClick={() => setIsModalVisible(!isModalVisible)}
                  style={{backgroundImage: `url(${profileCardBackground})`, backgroundSize: 'cover'}}>
                <Card.Content>
                    <Card.Meta textAlign="center">
                        <Image src={profile.imageUrl} alt={`User profile: ${profile.name}`} size="small" rounded/>
                    </Card.Meta>

                    <Card.Header textAlign="center" as="h3" style={{marginTop: '0.5rem'}}>{profile.name}</Card.Header>

                    <Card.Meta textAlign="center">
                        <span style={{fontSize: '1rem'}}>{profile.role}</span>
                    </Card.Meta>

                    <Card.Description style={{margin: '1rem 0 0 0'}}>
                        <ProfileCardSkills skills={profile.skills} requestedSkills={requestedSkills}/>
                    </Card.Description>
                </Card.Content>

                <Card.Content extra>
                    <ProfileCardFooter profile={profile}/>
                </Card.Content>
            </Card>
        </>
    );
};
