import {Profile} from "skillset";
import {Icon, Card, Image, Rating} from "semantic-ui-react";

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
                    <p>{profile.skills[0]}</p>
                    <Rating data-rating="4" data-max-rating="5" disabled></Rating>
                </Card.Meta>
                <Card.Meta>
                    {profile.isAvailable
                        ? <Icon className={"check circle green"}/>
                        : <Icon className={"minus circle red"}/>}
                    <span>{profile.currentClient}</span>
                </Card.Meta>
            </Card.Content>
        </Card>
    )
}
