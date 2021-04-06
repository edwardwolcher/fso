import React from "react";
import ToggleField from "./ToggleField";
import blogService from "../services/blogs";

// UTILITY FUNCTIONS (maybe move somewhere else)
const canDelete = (user, blog) => {
  if (!user) return false;
  switch (user.role) {
    case "author":
      if (user.id === blog.author.id) return true;
      else return false;
    case "editor":
      return true;
    case "admin":
      return true;
    default:
      return false;
  }
};

const BlogDetails = ({ blog, user, deleteBlog, likeBlog }) => {
  const deletable = canDelete(user, blog);
  const likeable = user ? true : false;

  return (
    <div>
      <div>
        <p>{blog.url}</p>
        <div>
          {likeable && <button onClick={() => likeBlog(blog.id)}>♡</button>}{" "}
          {blog.likes}
        </div>
        <p>{blog.author.name}</p>
        {deletable && (
          <button onClick={() => deleteBlog(blog.id)}>delete</button>
        )}
      </div>
    </div>
  );
};

const Blog = ({ blog, blogs, setBlogs, sendMessage, user }) => {
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

  const likeBlog = async (id) => {
    try {
      const likedBlog = {
        ...blog,
        likes: blog.likes + 1,
      };
      console.log(likedBlog);
      const updatedBlog = await blogService.update(id, likedBlog);
      const indexToUpdate = blogs.findIndex(
        (blog) => blog.id === updatedBlog.id
      );
      const newBlogs = [...blogs];
      newBlogs[indexToUpdate] = updatedBlog;
      setBlogs(newBlogs);
    } catch (error) {
      sendMessage("error liking blog", "error");
    }
  };

  return (
    <div className="blogitem">
      <h3>{blog.title}</h3>
      <ToggleField buttonLabel="details">
        <BlogDetails
          blog={blog}
          user={user}
          deleteBlog={deleteBlog}
          likeBlog={likeBlog}
        />
      </ToggleField>
    </div>
  );
};

export default Blog;
