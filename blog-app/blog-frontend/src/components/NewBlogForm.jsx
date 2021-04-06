import React, { useState } from "react";
import Input from "./Input";
import blogService from "../services/blogs";

const NewBlogForm = ({ blogs, setBlogs, sendMessage, newBlogFormRef }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const submitBlog = async (event) => {
    event.preventDefault();
    try {
      const newBlog = await blogService.create({ title, url });
      const newBlogs = [...blogs, newBlog];
      newBlogs.sort((a, b) => b.likes - a.likes);
      setBlogs(newBlogs);
      setTitle("");
      setUrl("");
      sendMessage(`${newBlog.title} posted`);
      newBlogFormRef.current.toggleVisibility();
    } catch (error) {
      const errorMessage = "could not create blog";
      sendMessage(errorMessage, "error");
    }
  };
  const titleInputID = "input-newBlogTitle";
  const urlInputID = "input-newBlogUrl";
  const titleInputLabel = "Title:";
  const urlInpuLabel = "URL:";

  return (
    <div>
      <h2>Create New</h2>
      <form className="newBlogForm" onSubmit={submitBlog}>
        <label htmlFor={titleInputID}>{titleInputLabel}</label>
        <Input id={titleInputID} value={title} setter={setTitle} />
        <label htmlFor={urlInputID}>{urlInpuLabel}</label>
        <Input id={urlInputID} value={url} setter={setUrl} />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default NewBlogForm;