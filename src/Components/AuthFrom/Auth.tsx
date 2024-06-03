import './Auth.scss'
import {useState} from "react";
import SignIn from "./SignIn/SignIn.tsx";
import SignUp from "./SignUp/SignUp.tsx";
import Button from "../../UI/Button/Button.tsx";

function Auth() {

    const [login, setLogin] = useState<boolean>(true)

    const changeAuth = (type: boolean) => {
        setLogin(type)
    }

    return (
        <div className='auth'>
            <div className="auth__change">
                <Button
                    text='SignIn'
                    disabled={login}
                    onClick={() => changeAuth(true)}
                />
                <Button
                    text='SignUp'
                    disabled={!login}
                    onClick={() => changeAuth(false)}
                />
            </div>
            {login ? <SignIn /> : <SignUp />}
        </div>
    );
}

export default Auth;
