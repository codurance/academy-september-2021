import {ProfileEditState} from "../ProfileEditState";
import React, {useEffect, useState} from "react";
import {Message} from "semantic-ui-react";

type Props = {
    profileEditState: ProfileEditState
};

export const ProfileEditFeedback: React.FC<Props> = ({profileEditState}) => {
    const [showFeedback, setShowFeedback] = useState(true);

    useEffect(() => {
        setShowFeedback(true);
        if (!hasProfileEditState(ProfileEditState.PERFORMING_NETWORK_REQUEST) && !hasProfileEditState(ProfileEditState.PROFILE_NOT_CREATED)) {
            setTimeout(() => setShowFeedback(false), 5000);
        }
    }, [profileEditState]);

    const hasProfileEditState = (state: ProfileEditState) => profileEditState == state;

    if (!showFeedback) return null;

    return (
        <>
            {profileEditState === ProfileEditState.PROFILE_NOT_CREATED &&
            <Message info>
                <Message.Header>It looks like this is your first time creating a profile</Message.Header>
                <p>Save your details below to be shown in search results</p>
                <p>If you don&apos;t want to be shown in search results you do not need to save this form. You can still
                    search for profiles.</p>
            </Message>
            }

            {profileEditState === ProfileEditState.PROFILE_SAVED &&
            <Message positive>Profile Saved</Message>
            }

            {profileEditState === ProfileEditState.NETWORK_ERROR &&
            <Message negative>Unable to save profile, please try again</Message>
            }
        </>
    );
};