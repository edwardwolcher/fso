import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginForm from "./LoginForm";

const Menu = () => {
  const user = useSelector((state) => state.login);

  return (
    <header>
      <nav>
        <Link to="/">Blogs</Link>
        <Link to="/users">Users</Link>
        {user && user.canPost() && <Link to="/create">New Post</Link>}
      </nav>
      <LoginForm />
    </header>
  );
};

export default Menu;
