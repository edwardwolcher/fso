import React, { useState } from "react";
import Input from "./Input";
import blogService from "../services/blogs";

const NewBlogForm = ({ blogs, setBlogs, sendMessage }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const submitBlog = async (event) => {
    event.preventDefault();
    try {
      const newBlog = await blogService.create({ title, url });
      console.log(newBlog);
      const newBlogs = [...blogs, newBlog];
      setBlogs(newBlogs);
      setTitle("");
      setUrl("");
      sendMessage(`${newBlog.title} posted`);
    } catch (error) {
      const errorMessage = error.response.data.error
        ? error.response.data.error
        : "could not create blog";
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
