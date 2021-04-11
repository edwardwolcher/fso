import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { editBlog, removeBlog, addComment } from "../reducers/blogsReducer";
import Input from "./Input";

const Blog = () => {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const history = useHistory();
  const [comment, setComment] = useState("");
  const id = useParams().id;

  const blog = blogs.find((b) => b.id === id);

  if (!blog) return <>No blog</>;

  const deleteBlog = (blog) => {
    if (!window.confirm(`Delete ${blog.title} by ${blog.author.name}?`)) return;
    dispatch(removeBlog(blog));
    history.push("/");
  };

  const likeBlog = (blog) => {
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    dispatch(editBlog(likedBlog));
  };

  const sendComment = () => {
    dispatch(addComment(blog.id, comment));
    setComment("");
  };
  return (
    <div>
      <h1>{blog.title}</h1>
      <div>{blog.url}</div>
      {user && (
        <button className="likeButton" onClick={() => likeBlog(blog)}>
          ♡
        </button>
      )}
      <span className="blogLikes">{blog.likes} likes</span>
      {user && user.canEdit && (
        <button onClick={() => deleteBlog(blog)}>delete</button>
      )}
      <div>
        <h2>comments</h2>
        <div>
          <p>Add comment: </p>
          <Input value={comment} setter={setComment} />
          <button onClick={() => sendComment()}>Add</button>
        </div>
        {blog.comments.map((comment, index) => (
          <div key={index}>{comment}</div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
