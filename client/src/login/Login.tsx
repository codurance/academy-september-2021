import {LoginService} from "./LoginService";
import {useState} from 'react';

export const Login = ({loginService}: { loginService: LoginService }) => {

    const [hasLoginError, setHasLoginError] = useState(false);

    async function attemptLogin() {
        await loginService.login()
            .catch(() => setHasLoginError(true));
    }

    return (
        <div>
            <button onClick={attemptLogin}>Login</button>
            {hasLoginError &&
            <>
                <p>Login attempt was unsuccessful, please check the following:</p>
                <ul>
                    <li>Ensure you are logged in to your Codurance account</li>
                    <li>Enable popups for this page</li>
                </ul>
            </>
            }
        </div>
    )
}