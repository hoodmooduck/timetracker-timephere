import "./SignUp.scss";
import Input from "../../../UI/Input/Input.tsx";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Button from "../../../UI/Button/Button.tsx";
import { auth } from "../../../Modules/Firebase/config.ts";
import { useNavigate } from "react-router-dom";
import { UserType } from "../../../Modules/types/authTypes.ts";
import { login } from "../../../Modules/Redux/actions/auth.ts";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../Modules/hooks/hooks-redux.ts";
import { useLocalStorage } from "../../../Modules/hooks/useLocalStorage.ts";

function SignUp() {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const { user } = useAppSelector((state) => state.auth);

  const localState = `${user.uidUser}_userInfo`;

  const dispatch = useAppDispatch();

  const [email, setEmail] = useState<string>("");
  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const [password, setPassword] = useState<string>("");
  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const [repeat, setRepeat] = useState<string>("");
  const changeRepeat = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepeat(e.target.value);
  };

  const { setItem } = useLocalStorage(localState);

  let navigate = useNavigate();

  const registration = (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }
    if (password !== repeat) {
      alert("Passwords не совпадают");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        navigate("/main/");
        setEmail("");
        setPassword("");
        setRepeat("");
        const _user: UserType = {
          uidUser: user.user.uid,
          email: user.user.email,
          // @ts-ignore просто в типах firebase не прописан тип для accessToken`a 🤡
          accessToken: user.user.accessToken,
          refreshToken: user.user.refreshToken,
        };
        setItem(_user);
        dispatch(login(_user));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="sign-in auth__form">
      <form onSubmit={registration}>
        <Input
          id="email"
          type="text"
          label="Enter Email"
          value={email}
          onChange={changeEmail}
        />
        <Input
          id="password"
          type="password"
          label="Enter Password"
          value={password}
          onChange={changePassword}
        />
        <Input
          id="repeate_password"
          type="password"
          label="Repeat Password"
          value={repeat}
          onChange={changeRepeat}
        />
        <Button text="Registration" />
      </form>
    </div>
  );
}

export default SignUp;
