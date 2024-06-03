import './SignIn.scss'
import Input from "../../../UI/Input/Input.tsx";
import React, {useEffect, useState} from "react";
import Button from "../../../UI/Button/Button.tsx";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../../Modules/Firebase/config.ts";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../../Modules/hooks/hooks-redux.ts";
import {UserType} from "../../../Modules/types/authTypes.ts";
import {login} from "../../../Modules/Redux/actions/auth.ts";
import {useLocalStorage} from "../../../Modules/hooks/useLocalStorage.ts";

function SignIn() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const localState = 'userInfo'

    const dispatch = useAppDispatch()
    const {setItem, getItem} = useLocalStorage(localState)

    const [email, setEmail] = useState<string>('')
    const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const [password, setPassword] = useState<string>('')
    const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    useEffect(() => {
        const item: UserType = getItem()
        if (item) {
            navigate('/main/')
            dispatch(login(item))
        }
    }, []);

    let navigate = useNavigate();

    const authorization = (e: React.FormEvent) => {
        e.preventDefault();

        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((user) => {
                navigate('/main/')
                setEmail('')
                setPassword('')
                const _user: UserType = {
                    uidUser: user.user.uid,
                    email: user.user.email,
                    // @ts-ignore просто в типах firebase не прописан тип для accessToken`a 🤡
                    accessToken: user.user.accessToken,
                    refreshToken: user.user.refreshToken
                }
                setItem(_user)
                dispatch(login(_user))
            })
            .catch(err => console.error(err))
    }


    return (
        <div className='sign-in auth__form'>
            <form onSubmit={authorization}>
                <Input
                    id='email'
                    type='text'
                    label='Enter Email'
                    value={email}
                    onChange={changeEmail}
                />
                <Input
                    id='password'
                    type='password'
                    label='Enter Password'
                    value={password}
                    onChange={changePassword}
                />
                <Button
                    text='Authorization'
                />
            </form>
        </div>
    );
}

export default SignIn;
