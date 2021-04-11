import { notify } from "./notificationReducer";
import blogService from "../services/blogs";

export const addBlog = (title, url) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create({ title, url });
      dispatch({
        type: "ADD_BLOG",
        data: newBlog,
      });
      dispatch({
        type: "ADD_USER_BLOG",
        data: newBlog,
      });
      notify(dispatch, `${newBlog.title} created`);
    } catch (error) {
      const errorMessage = error.response.data.error
        ? error.response.data.error
        : "error creating blog";
      notify(dispatch, errorMessage, "error");
    }
  };
};

export const removeBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blog.id);
      dispatch({
        type: "REMOVE_BLOG",
        data: blog,
      });
      dispatch({
        type: "DELETE_USER_BLOG",
        data: blog,
      });
      notify(dispatch, `${blog.title} deleted`);
    } catch (error) {
      const errorMessage = error.response.data.error
        ? error.response.data.error
        : "error deleting blog";
      notify(dispatch, errorMessage, "error");
    }
  };
};

export const addComment = (id, comment) => {
  return async (dispatch) => {
    try {
      const blog = await blogService.comment(id, comment);
      dispatch({
        type: "EDIT_BLOG",
        data: blog,
      });
      dispatch({
        type: "UPDATE_USER_BLOG",
        data: blog,
      });
    } catch {
      const errorMessage = "error adding comment";
      notify(dispatch, errorMessage, "error");
    }
  };
};

export const editBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.update(blog.id, blog);
      dispatch({
        type: "EDIT_BLOG",
        data: blog,
      });
      dispatch({
        type: "UPDATE_USER_BLOG",
        data: blog,
      });
      notify(dispatch, `${blog.title} updated`);
    } catch (error) {
      const errorMessage = error.response.data.error
        ? error.response.data.error
        : "error updating blog";
      notify(dispatch, errorMessage, "error");
    }
  };
};

export const initBlogs = () => {
  return async (dispatch) => {
    try {
      const blogs = await blogService.getAll();
      dispatch({
        type: "INIT_BLOGS",
        data: blogs,
      });
    } catch (error) {
      const errorMessage = error.response.data.error
        ? error.response.data.error
        : "error getting blogs";
      notify(dispatch, errorMessage, "error");
    }
  };
};

const blogsReducer = (state = [], action) => {
  const newState = [...state];
  switch (action.type) {
    case "INIT_BLOGS":
      return action.data;
    case "ADD_BLOG":
      newState.push(action.data);
      return newState;
    case "EDIT_BLOG":
      const indexToEdit = newState.findIndex((b) => b.id === action.data.id);
      newState[indexToEdit] = action.data;
      return newState;

    case "REMOVE_BLOG":
      const indexToDelete = newState.findIndex((b) => b.id === action.data.id);
      newState.splice(indexToDelete, 1);
      return newState;
    default:
      return state;
  }
};

export default blogsReducer;
