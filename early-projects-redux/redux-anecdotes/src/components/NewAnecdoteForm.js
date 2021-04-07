import React from "react";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";

const NewAnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    dispatch(createAnecdote(content));
    dispatch(setNotification(`${content} created`));
    event.target.anecdote.value = "";
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input name="anecdote" />
      </div>
      <button>create</button>
    </form>
  );
};

export default NewAnecdoteForm;
