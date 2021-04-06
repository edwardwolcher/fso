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

const BlogDetails = ({ blog, user, deleteBlog }) => {
  const deletable = canDelete(user, blog);

  return (
    <div>
      <div>
        <p>{blog.url}</p>

        <p>{blog.author.name}</p>
        {deletable && (
          <button onClick={() => deleteBlog(blog.id)}>delete</button>
        )}
      </div>
    </div>
  );
};

const Blog = ({ blog, blogs, setBlogs, sendMessage, user }) => {
  const likeable = user ? true : false;

  const deleteBlog = async (id) => {
    if (!window.confirm(`Remove ${blog.title} by ${blog.author.name}?`)) return;
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
      const updatedBlog = await blogService.update(id, likedBlog);
      const indexToUpdate = blogs.findIndex(
        (blog) => blog.id === updatedBlog.id
      );
      const newBlogs = [...blogs];
      newBlogs[indexToUpdate] = updatedBlog;
      newBlogs.sort((a, b) => b.likes - a.likes);
      setBlogs(newBlogs);
    } catch (error) {
      sendMessage("error liking blog", "error");
    }
  };

  return (
    <div className="blogitem">
      <div className="blogHeader">
        <h3>{blog.title}</h3>
        <div className="blogLikeField">
          {likeable && (
            <button className="likeButton" onClick={() => likeBlog(blog.id)}>
              ♡
            </button>
          )}
          <span className="blogLikes">{blog.likes} likes</span>
        </div>
      </div>
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
