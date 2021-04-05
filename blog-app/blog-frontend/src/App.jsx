import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getBlogs = async () => {
      const response = await blogService.getAll();
      setBlogs(response);
    };
    const getUser = () => {
      const savedUser = window.localStorage.getItem("userInfo");
      if (!savedUser) return;
      setUser(savedUser);
    };
    getUser();
    getBlogs();
  }, []);

  const login = async (event) => {
    event.preventDefault();
    try {
      const newUser = await loginService.login(username, password);
      window.localStorage.setItem("userInfo", JSON.stringify(newUser));
      blogService.setToken(newUser.token);
      setUser(newUser);
      setUsername("");
      setPassword("");
    } catch (error) {
      //TODO - error handling
      console.log(error);
    }
  };

  const logout = async () => {
    window.localStorage.removeItem("userInfo");
    blogService.setToken(null);
    setUser(null);
  };

  return (
    <div>
      <h2>blogs</h2>

      <LoginForm
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        login={login}
        logout={logout}
        user={user}
      />

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
