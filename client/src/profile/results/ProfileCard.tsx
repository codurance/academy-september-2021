import {Profile} from "skillset";
import {Icon} from "semantic-ui-react";

export const ProfileCard = ({profile}: { profile: Profile }) => {
    let statusIcon = <Icon className={"minus circle red"}/>

    if (profile.isAvailable) statusIcon = <Icon className={"check circle green"}/>

    return (
        <div className="ui card">
            <div className="image">
                <img src={profile.imageUrl} alt={`User profile: ${profile.name}`}/>
            </div>
            <div className="content">
                <h2 className="header">{profile.name}</h2>
                <div className="meta">
                    <span className="role">{profile.role}</span>
                </div>
                <div className="meta">
                    {statusIcon}
                    <span className="status">{profile.currentClient}</span>
                </div>
            </div>
        </div>
    )
}
