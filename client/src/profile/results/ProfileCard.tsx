export const ProfileCard = ({name, role}: { name:string, role:string }) => {

    return (
        <div className="ui card">
            <div className="image">
                <img src="../../shared/ui/logo.svg" alt={`User profile: ${name}`}/>
            </div>
            <div className="content">
                <a className="header">{name}</a>
                <div className="meta">
                    <span className="role">{role}</span>
                </div>
            </div>
        </div>
    )
}
