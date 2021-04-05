import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import MessageBox from "./components/MessageBox";
import NewBlogForm from "./components/NewBlogForm";
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

  const deleteBlog = async (id) => {
    try {
      await blogService.remove(id);
      const indexToRemove = blogs.findIndex((blog) => blog.id === id);
      const deletedBlogTitle = blogs[indexToRemove].title;
      const newBlogs = [...blogs];
      newBlogs.splice(indexToRemove, 1);
      setBlogs(newBlogs);
      sendMessage(`${deletedBlogTitle} removed`);
    } catch (error) {
      sendMessage("error deleting blog", "error");
    }
  };

  return (
    <div className="app">
      <header>
        <h1>Blog</h1>
        <LoginForm user={user} setUser={setUser} sendMessage={sendMessage} />
      </header>
      {message && <MessageBox message={message} />}
      <div className="wrapper">
        {canPost(user) && (
          <NewBlogForm
            blogs={blogs}
            setBlogs={setBlogs}
            sendMessage={sendMessage}
          />
        )}
        <div className="bloglist">
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              deleteBlog={deleteBlog}
              user={user}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
