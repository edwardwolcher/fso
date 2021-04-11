import React, { useState, useEffect, useRef } from "react";
import Bloglist from "./components/Bloglist";
import Users from "./components/Users";
import User from "./components/User";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import NewBlogForm from "./components/NewBlogForm";
import Menu from "./components/Menu";
import { useDispatch } from "react-redux";
import { initBlogs } from "./reducers/blogsReducer";
import { initUser } from "./reducers/loginReducer";
import "./app.css";
import { initUsers } from "./reducers/usersReducer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initUsers());
    dispatch(initBlogs());
    dispatch(initUser());
  }, []);

  return (
    <div className="site-wrap">
      <Router>
        <Menu />
        <Notification />
        <main className="wrapper">
          <Switch>
            <Route path="/users/:id">
              <User />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/create">
              <NewBlogForm />
            </Route>
            <Route path="/blogs/:id">
              <Blog />
            </Route>
            <Route path="/">
              <Bloglist />
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
};

export default App;
