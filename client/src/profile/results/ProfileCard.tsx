import {Profile} from "skillset";
import {Card, Icon, Image} from "semantic-ui-react";
import React from "react";

type Props = {
    profile: Profile
};

export const ProfileCard: React.FC<Props> = ({profile}: Props) => {
    return (
        <Card>
            <Image src={profile.imageUrl} alt={`User profile: ${profile.name}`}/>
            <Card.Content>
                <Card.Header>{profile.name}</Card.Header>
                <Card.Meta>
                    <span>{profile.role}</span>
                </Card.Meta>
                <Card.Meta>
                    {profile.isAvailable
                        ? <Icon className={"check circle green"}/>
                        : <Icon className={"minus circle red"}/>}
                    <span>{profile.currentClient}</span>
                </Card.Meta>
            </Card.Content>
        </Card>
    );
};
