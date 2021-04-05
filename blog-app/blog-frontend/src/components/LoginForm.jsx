import React from "react";
import Input from "./Input";

const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  login,
  logout,
  user,
}) => {
  const usernameID = "input-username";
  const passwordID = "input-password";
  const usernameLabel = "Username:";
  const passwordLabel = "Password:";

  const loginForm = () => (
    <form onSubmit={login}>
      <label htmlFor={usernameID}>{usernameLabel}</label>
      <Input
        placeHolder="username"
        value={username}
        setter={setUsername}
        id={usernameID}
      ></Input>
      <label htmlFor={passwordID}>{passwordLabel}</label>
      <Input
        placeHolder="password"
        type="password"
        value={password}
        setter={setPassword}
        id={passwordID}
      ></Input>
      <button type="submit">login</button>
    </form>
  );

  const loggedInForm = () => (
    <div>
      <p>{user.username} logged in</p>
      <button onClick={() => logout()}>logout</button>
    </div>
  );

  return user === null ? loginForm() : loggedInForm();
};

export default LoginForm;
