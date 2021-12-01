import {Profile} from "../shared/domain";

export const ProfileCard = ({profile}: { profile: Profile }) => {

    return (
        <div className="ui card">
            <div className="image">
                <img src="../../shared/ui/logo.svg" alt={`User profile: ${profile.name}`}/>
            </div>
            <div className="content">
                <a className="header">{profile.name}</a>
                <div className="meta">
                    <span className="role">{profile.role}</span>
                </div>
            </div>
        </div>
    )
}
