import React, { useState, useEffect, useRef } from "react";
import Bloglist from "./components/Bloglist";
import MessageBox from "./components/MessageBox";
import NewBlogForm from "./components/NewBlogForm";
import ToggleField from "./components/ToggleField";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import "./app.css";

// UTILITY FUNCTION (maybe move somewhere else)
const canPost = (user) => {
  if (!user) return false;
  switch (user.role) {
    case "author":
      return true;
    case "editor":
      return true;
    case "admin":
      return true;
    default:
      return false;
  }
};

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  const sendMessage = (text, type = "ok", duration = 5000) => {
    const newMessage = { text, type };
    setMessage(newMessage);
    setTimeout(() => {
      setMessage(null);
    }, duration);
  };

  useEffect(() => {
    const getBlogs = async () => {
      const response = await blogService.getAll();
      response.sort((a, b) => b.likes - a.likes);
      setBlogs(response);
    };
    getBlogs();
  }, []);

  useEffect(() => {
    const savedUserJSON = window.localStorage.getItem("userInfo");
    if (savedUserJSON) {
      const savedUser = JSON.parse(savedUserJSON);
      setUser(savedUser);
      blogService.setToken(savedUser.token);
    }
  }, []);

  const newBlogFormRef = useRef();

  const newBlogForm = () => {
    if (!canPost(user)) return null;
    return (
      <ToggleField buttonLabel="New Blog" ref={newBlogFormRef}>
        <NewBlogForm
          blogs={blogs}
          setBlogs={setBlogs}
          sendMessage={sendMessage}
          newBlogFormRef={newBlogFormRef}
        />
      </ToggleField>
    );
  };

  const bloglist = () => (
    <Bloglist
      blogs={blogs}
      setBlogs={setBlogs}
      sendMessage={sendMessage}
      user={user}
    />
  );

  return (
    <div className="app">
      <header>
        <h1>Blog</h1>
        <LoginForm user={user} setUser={setUser} sendMessage={sendMessage} />
      </header>
      {message && <MessageBox message={message} />}
      <div className="wrapper">
        {newBlogForm()}
        {bloglist()}
      </div>
    </div>
  );
};

export default App;
