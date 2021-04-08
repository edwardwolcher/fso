import React from "react";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { filterChange } from "../reducers/filterReducer";
import { connect } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, vote }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote)}>vote</button>
      </div>
    </div>
  );
};

const AnecdoteList = (props) => {
  const vote = (anecdote) => {
    props.voteAnecdote(anecdote);
    props.setNotification(`You voted for ${anecdote.content}`, 2);
  };

  const anecdotes = () => props.anecdotes;

  const applyFilter = (event) => {
    const newFilter = event.target.value;
    props.filterChange(newFilter);
  };

  return (
    <div>
      <div>
        Filter <input onChange={applyFilter}></input>
      </div>
      {anecdotes().map((anecdote) => (
        <Anecdote key={anecdote.id} anecdote={anecdote} vote={vote} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  const list = state.anecdotes.filter((a) =>
    a.content.toLowerCase().includes(state.filter.toLowerCase())
  );
  list.sort((a, b) => b.votes - a.votes);
  return {
    anecdotes: list,
  };
};

const mapDispatchToProps = {
  voteAnecdote,
  filterChange,
  setNotification,
};

const ConnectedAnecdotesList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);
export default ConnectedAnecdotesList;
