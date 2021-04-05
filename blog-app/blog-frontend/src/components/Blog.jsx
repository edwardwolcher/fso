import React from "react";

// UTILITY FUNCTION (maybe move somewhere else)
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

const Blog = ({ blog, deleteBlog, user }) => {
  return (
    <div>
      <b>{blog.author.username}</b> - {blog.title}{" "}
      {canDelete(user, blog) && (
        <button onClick={() => deleteBlog(blog.id)}>delete</button>
      )}
    </div>
  );
};

export default Blog;
