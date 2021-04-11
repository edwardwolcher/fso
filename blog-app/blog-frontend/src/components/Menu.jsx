import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginForm from "./LoginForm";

const Menu = () => {
  const user = useSelector((state) => state.login);

  return (
    <header className="site-head">
      <div className="wrapper navbar">
        <nav className="nav-list">
          <Link className="nav-link" to="/">
            Blogs
          </Link>
          <Link className="nav-link" to="/users">
            Users
          </Link>
          {user && user.canPost() && (
            <Link className="nav-link" to="/create">
              New Post
            </Link>
          )}
        </nav>
        <LoginForm />
      </div>
    </header>
  );
};

export default Menu;
