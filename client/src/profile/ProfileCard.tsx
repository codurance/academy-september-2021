export const ProfileCard = (props) => {

    return (
        <div className="ui card">
            <div className="image">
                <img src="../shared/ui/logo.svg" alt={`User profile: ${props.name}`}/>
            </div>
            <div className="content">
                <a className="header">{props.name}</a>
                <div className="meta">
                    <span className="role">{props.role}</span>
                </div>
            </div>
        </div>
    )
}
