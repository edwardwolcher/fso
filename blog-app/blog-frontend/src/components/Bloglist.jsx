import React from "react";
import ToggleField from "./ToggleField";
import { removeBlog, editBlog } from "../reducers/blogsReducer";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BlogListing = ({ blog, user }) => {
  const dispatch = useDispatch();
  const deleteBlog = (blog) => {
    if (!window.confirm(`Delete ${blog.title} by ${blog.author.name}?`)) return;
    dispatch(removeBlog(blog));
  };
  const likeBlog = (blog) => {
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    dispatch(editBlog(likedBlog));
  };

  return (
    <div className="blogitem">
      <div className="blogHeader">
        <h3>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </h3>
        <div className="blogLikeField">
          {user && (
            <button className="likeButton" onClick={() => likeBlog(blog)}>
              ♡
            </button>
          )}
          <span className="blogLikes">{blog.likes} likes</span>
        </div>
      </div>
    </div>
  );
};

const Bloglist = () => {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.login);

  if (blogs.length < 1) return <></>;

  blogs.sort((a, b) => b.likes - a.likes);

  return (
    <div className="bloglist">
      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <BlogListing key={blog.id} blog={blog} user={user} />
      ))}
    </div>
  );
};

export default Bloglist;
