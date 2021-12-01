import {Profile} from "skillset";
import {Icon, Card, Image} from "semantic-ui-react";

export const ProfileCard = ({profile}: { profile: Profile }) => {
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
