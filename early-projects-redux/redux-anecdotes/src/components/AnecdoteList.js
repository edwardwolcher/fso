import React from "react";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { filterChange } from "../reducers/filterReducer";
import { useSelector, useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote));
    dispatch(setNotification(`You voted for ${anecdote.content}`, 2));
  };

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

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const anecdotes = useSelector((state) => {
    const list = state.anecdotes.filter((a) =>
      a.content.toLowerCase().includes(state.filter.toLowerCase())
    );
    return list.sort((a, b) => b.votes - a.votes);
  });

  const applyFilter = (event) => {
    const newFilter = event.target.value;
    dispatch(filterChange(newFilter));
  };

  return (
    <div>
      <div>
        Filter <input onChange={applyFilter}></input>
      </div>
      {anecdotes.map((anecdote) => (
        <Anecdote key={anecdote.id} anecdote={anecdote} />
      ))}
    </div>
  );
};

export default AnecdoteList;
