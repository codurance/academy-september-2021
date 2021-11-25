import {LoginService} from "./LoginService";

export const Login = ({loginService}: { loginService: LoginService }) => {
    return (
        <div>
            <button onClick={async () => await loginService.login()}>Login</button>
        </div>
    )
}