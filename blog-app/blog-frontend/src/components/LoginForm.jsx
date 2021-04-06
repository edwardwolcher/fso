import React, { useState } from "react";
import blogService from "../services/blogs";
import loginService from "../services/login";
import Input from "./Input";

const LoginForm = ({ user, setUser, sendMessage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showLogin, setShowLogin] = useState(false);

  const login = async (event) => {
    event.preventDefault();
    try {
      const newUser = await loginService.login(username, password);
      window.localStorage.setItem("userInfo", JSON.stringify(newUser));
      blogService.setToken(newUser.token);
      setUser(newUser);
      setUsername("");
      setPassword("");
      sendMessage(`logged in as ${newUser.username}`);
      setShowLogin(false);
    } catch (error) {
      const errorMessage = error.response.data.error
        ? error.response.data.error
        : "invalid username or password";
      sendMessage(errorMessage, "error");
    }
  };

  const logout = async () => {
    window.localStorage.removeItem("userInfo");
    blogService.setToken(null);
    setUser(null);
    setShowLogin(false);
    sendMessage(`${user.username} logged out`);
  };

  const loginForm = () => {
    return (
      <form onSubmit={login}>
        <fieldset className="loginField">
          <Input
            placeHolder="username"
            value={username}
            setter={setUsername}
          ></Input>
          <Input
            placeHolder="password"
            type="password"
            value={password}
            setter={setPassword}
          ></Input>
        </fieldset>

        <button type="submit">login</button>
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
