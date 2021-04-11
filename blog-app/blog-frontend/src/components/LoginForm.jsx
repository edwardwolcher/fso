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
      <form data-state="login-open" className="login-form" onSubmit={login}>
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

        <button className="bg-secondary" id="input-loginButton" type="submit">
          login
        </button>
        <button className="bg-tertiary" onClick={() => setShowLogin(false)}>
          cancel
        </button>
      </form>
    );
  };

  const loggedInForm = () => (
    <div data-state="logged-in" className="login-form">
      <div className="login-info">{user.username} logged in</div>
      <button className="bg-tertiary" type="button" onClick={() => logout()}>
        logout
      </button>
    </div>
  );

  if (user === null && !showLogin) {
    return (
      <div data-state="login-closed" className="login-form">
        <button className="bg-secondary" onClick={() => setShowLogin(true)}>
          Sign in
        </button>
      </div>
    );
  }

  return user === null ? loginForm() : loggedInForm();
};

export default LoginForm;
