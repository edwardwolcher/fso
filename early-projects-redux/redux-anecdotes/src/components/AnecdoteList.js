import React from "react";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { useSelector, useDispatch } from "react-redux";

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteAnecdote(id));
  };

  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>
  );
};

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state);
  anecdotes.sort((a, b) => b.votes - a.votes);

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <Anecdote key={anecdote.id} anecdote={anecdote} />
      ))}
    </div>
  );
};

export default AnecdoteList;
