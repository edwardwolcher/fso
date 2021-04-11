import React, { useState } from "react";
import Input from "./Input";
import { loginUser, logoutUser } from "../reducers/loginReducer";
import { useDispatch, useSelector } from "react-redux";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showLogin, setShowLogin] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.login);

  const login = (event) => {
    event.preventDefault();
    dispatch(loginUser(username, password));
    setUsername("");
    setPassword("");
  };

  const logout = async () => {
    dispatch(logoutUser(user));
    setShowLogin(false);
    setUsername("");
    setPassword("");
  };

  const loginForm = () => {
    return (
      <form onSubmit={login}>
        <fieldset className="loginField">
          <Input
            placeHolder="username"
            value={username}
            setter={setUsername}
            id="input-loginUsername"
          ></Input>
          <Input
            placeHolder="password"
            type="password"
            value={password}
            setter={setPassword}
            id="input-loginPassword"
          ></Input>
        </fieldset>

        <button id="input-loginButton" type="submit">
          login
        </button>
        <button onClick={() => setShowLogin(false)}>cancel</button>
      </form>
    );
  };

  const loggedInForm = () => (
    <div>
      <p>{user.username} logged in</p>
      <button type="button" onClick={() => logout()}>
        logout
      </button>
    </div>
  );

  if (user === null && !showLogin) {
    return <button onClick={() => setShowLogin(true)}>Sign in</button>;
  }

  return user === null ? loginForm() : loggedInForm();
};

export default LoginForm;
