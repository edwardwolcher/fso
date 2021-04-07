import React from "react";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import { connect } from "react-redux";

const NewAnecdoteForm = (props) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    props.createAnecdote(content);
    props.setNotification(`${content} created`);
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

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  createAnecdote,
  setNotification,
};

const ConnectedNewAnecdoteForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewAnecdoteForm);

export default ConnectedNewAnecdoteForm;
