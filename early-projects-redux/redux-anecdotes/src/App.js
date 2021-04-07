import React, { useEffect } from "react";
import NewAnecdoteForm from "./components/NewAnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";
import { initializeAnecdotes } from "./reducers/anecdoteReducer";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <h2>create new</h2>
      <NewAnecdoteForm />
      <Notification />
    </div>
  );
};

export default App;
