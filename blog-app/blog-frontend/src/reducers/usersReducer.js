import { notify } from "./notificationReducer";
import userService from "../services/users";

export const initUsers = () => {
  return async (dispatch) => {
    try {
      const users = await userService.getAll();
      dispatch({
        type: "INIT_USERS",
        data: users,
      });
    } catch (error) {
      const errorMessage = error.response.data.error
        ? error.response.data.error
        : "error getting users";
      notify(dispatch, errorMessage, "error");
    }
  };
};

const updateUserBlog = (state, blog) => {
  const newState = [...state];
  const userIndex = newState.findIndex((u) => u.id === blog.author.id);
  const blogIndex = newState[userIndex].blogs.findIndex(
    (b) => b.id === blog.id
  );
  newState[userIndex].blogs[blogIndex] = blog;
  return newState;
};

const deleteUserBlog = (state, blog) => {
  const newState = [...state];
  const userIndex = newState.findIndex((u) => u.id === blog.author.id);
  const blogIndex = newState[userIndex].blogs.findIndex(
    (b) => b.id === blog.id
  );
  newState[userIndex].blogs.splice([blogIndex], 1);
  return newState;
};

const addUserBlog = (state, blog) => {
  const newState = [...state];
  const userIndex = newState.findIndex((u) => u.id === blog.author.id);
  newState[userIndex].blogs.push(blog);
  return newState;
};

const usersReducer = (state = [], action) => {
  let newState;
  switch (action.type) {
    case "INIT_USERS":
      newState = action.data;
      return newState;
    case "UPDATE_USER_BLOG":
      newState = updateUserBlog(state, action.data);
      return newState;
    case "DELETE_USER_BLOG":
      newState = deleteUserBlog(state, action.data);
      return newState;
    case "ADD_USER_BLOG":
      newState = addUserBlog(state, action.data);
      return newState;
    default:
      return state;
  }
};

export default usersReducer;
