import React from "react";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";

const NewAnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    dispatch(createAnecdote(anecdote));
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
