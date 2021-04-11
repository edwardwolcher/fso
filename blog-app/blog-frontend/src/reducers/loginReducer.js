import loginService from "../services/login";
import blogService from "../services/blogs";
import { notify } from "./notificationReducer";

class User {
  constructor(userInfo) {
    this.token = userInfo.token;
    this.username = userInfo.username;
    this.id = userInfo.id;
    this.role = userInfo.role;
  }
  canPost() {
    switch (this.role) {
      case "author":
      case "editor":
      case "admin":
        return true;
      default:
        return false;
    }
  }
  canEdit(blog) {
    if (!blog) return false;
    switch (this.role) {
      case "editor":
      case "admin":
        return true;
      case "author":
        if (blog.author.id === this.id) return true;
      default:
        return false;
    }
  }
  store() {
    blogService.setToken(this.token);
    window.localStorage.setItem("userInfo", JSON.stringify(this));
  }
  clear() {
    blogService.setToken(null);
    window.localStorage.removeItem("userInfo");
  }
}

export const initUser = () => {
  return (dispatch) => {
    const savedUserJSON = window.localStorage.getItem("userInfo");
    if (savedUserJSON) {
      const user = new User(JSON.parse(savedUserJSON));
      dispatch({
        type: "LOGIN",
        data: user,
      });
    }
  };
};

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const userInfo = await loginService.login(username, password);
      const user = new User(userInfo);
      notify(dispatch, `${user.username} logged in`);
      dispatch({
        type: "LOGIN",
        data: user,
      });
    } catch (error) {
      const errorMessage = error.response.data.error
        ? error.response.data.error
        : "invalid username or password";
      notify(dispatch, errorMessage, "error");
    }
  };
};

export const logoutUser = (user) => {
  return (dispatch) => {
    notify(dispatch, `${user.username} logged out`);
    dispatch({
      type: "LOGOUT",
    });
  };
};

const loginReducer = (state = null, action) => {
  switch (action.type) {
    case "LOGIN":
      action.data.store();
      return action.data;
    case "LOGOUT":
      if (state) state.clear();
      return null;
    default:
      return state;
  }
};

export default loginReducer;
