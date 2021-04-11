import React, { useState } from "react";
import Input from "./Input";
import { useDispatch, useSelector } from "react-redux";
import { addBlog } from "../reducers/blogsReducer";
import ToggleField from "./ToggleField";
import { useHistory } from "react-router-dom";

const NewBlogForm = () => {
  const user = useSelector((state) => state.login);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  if (!user || !user.canPost()) {
    return <></>;
  }

  const submitBlog = async (event) => {
    event.preventDefault();
    dispatch(addBlog(title, url));
    setTitle("");
    setUrl("");
    history.push("/");
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
        <button id="input-newBlogSubmit" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default NewBlogForm;
