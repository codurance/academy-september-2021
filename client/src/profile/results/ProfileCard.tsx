import {Profile} from "skillset";
import {Card, Icon, Image} from "semantic-ui-react";
import React from "react";
import profileCardBackground from "./profile-card-background.svg";

type Props = {
    profile: Profile
};

export const ProfileCard: React.FC<Props> = ({profile}: Props) => (
    <Card style={{backgroundImage: `url(${profileCardBackground})`, backgroundSize: 'cover'}}>
        <Card.Content>
            <Card.Meta textAlign="center">
                <Image src={profile.imageUrl} alt={`User profile: ${profile.name}`} size="small" rounded/>
            </Card.Meta>

            <Card.Header textAlign="center" as="h3" style={{margin: '0.5rem 0 0 0'}}>{profile.name}</Card.Header>

            <Card.Meta textAlign="center">
                <span style={{fontSize: '1rem'}}>{profile.role}</span>
            </Card.Meta>

            <Card.Description style={{margin: '1rem 0 0 0'}}>
                {profile.skills.join(', ').replace(/, ([^,]*)$/, ', $1')}
            </Card.Description>
        </Card.Content>

        <Card.Content extra>
            {profile.isAvailable
                ? <Icon className={"check circle green"}/>
                : <Icon className={"minus circle red"}/>
            }
            <span>{profile.currentClient}</span>
        </Card.Content>
    </Card>
);
