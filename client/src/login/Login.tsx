import {LoginService} from "./LoginService";
import {useState} from 'react';
import {Button, Grid, Header, Image, Message} from "semantic-ui-react";
import logo from '../shared/ui/logo.svg';
import googleButton from './google-sign-in-button.png';

export const Login = ({loginService}: { loginService: LoginService }) => {
    const [hasLoginError, setHasLoginError] = useState(false);

    async function attemptLogin() {
        await loginService
            .login()
            .catch(() => setHasLoginError(true));
    }

    return (
        <Grid textAlign='center' style={{height: '100vh'}} verticalAlign='middle'>
            <Grid.Column style={{maxWidth: 450}}>
                <Image src={logo} centered height={200} width={100}/>
                <Header as='h1' textAlign='center' style={{fontFamily: 'Orbitron', fontSize: '4em'}}>SkillSet</Header>

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
                    <Image src={googleButton} alt="Sign in with Google" />
                </Button>
            </Grid.Column>
        </Grid>
    )
}