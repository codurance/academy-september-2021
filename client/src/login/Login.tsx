import {UserService} from "../shared/user/service/UserService";
import React, {useState} from 'react';
import {Button, Grid, Image, Message} from "semantic-ui-react";
import googleButton from './google-sign-in-button.png';
import {Logo} from "../shared/ui/Logo";

type Props = {
    userService: UserService
};

export const Login: React.FC<Props> = ({userService}: Props) => {
    const [hasLoginError, setHasLoginError] = useState(false);

    async function attemptLogin() {
        await userService
            .login()
            .catch(() => setHasLoginError(true));
    }

    return (
        <Grid textAlign='center' style={{height: '80vh'}} verticalAlign='middle'>
            <Grid.Column style={{maxWidth: 450}}>
                <Logo/>

                {hasLoginError &&
                <Message error>
                    <Message.Header>Login attempt was unsuccessful:</Message.Header>
                    <Message.List>
                        <Message.Item>Ensure you are logged in to your Codurance account</Message.Item>
                        <Message.Item>Enable popups for this page</Message.Item>
                    </Message.List>
                </Message>
                }

                <Button basic onClick={attemptLogin} style={{padding: 0, boxShadow: 'none'}}>
                    <Image src={googleButton} alt="Sign in with Google"/>
                </Button>
            </Grid.Column>
        </Grid>
    );
};