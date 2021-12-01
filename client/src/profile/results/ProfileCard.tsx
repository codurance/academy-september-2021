import {Profile} from "skillset";

export const ProfileCard = ({profile}: { profile: Profile }) => {
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
            </div>
        </div>
    )
}
