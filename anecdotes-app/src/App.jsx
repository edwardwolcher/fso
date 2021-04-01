import React, { useState } from "react";

// Data
const data = [
  {
    anecdote: "If it hurts, do it more often",
    votes: 0,
  },
  {
    anecdote: "Adding manpower to a late software project makes it later!",
    votes: 0,
  },
  {
    anecdote:
      "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    votes: 0,
  },
  {
    anecdote:
      "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    votes: 0,
  },
  {
    anecdote: "Premature optimization is the root of all evil.",
    votes: 0,
  },
  {
    anecdote:
      "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    votes: 0,
  },
];

// Utility Functions
const getRandomIndex = (array) => Math.floor(Math.random() * array.length);

// Components
const Button = ({ name, handleClick }) => (
  <button onClick={handleClick}>{name}</button>
);

const Anecdote = ({ anecdote, votes }) => (
  <div>
    <p>{anecdote}</p>
    <p>has {votes} votes</p>
  </div>
);

const App = () => {
  const anecdotes = data;

  const [selected, setSelected] = useState(0);
  const [upVotes, setUpVotes] = useState(new Array(anecdotes.length).fill(0));

  const setRandomAnecdote = () => {
    let randomIndex = getRandomIndex(anecdotes);
    while (randomIndex === selected) {
      randomIndex = getRandomIndex(anecdotes);
    }
    setSelected(randomIndex);
  };

  const upVoteAnecdote = (index) => {
    anecdotes[index].votes += 1;
    const newVotes = [...upVotes];
    newVotes[index] += 1;
    setUpVotes(newVotes);
  };

  return (
    <div>
      <h1>Anecdotes</h1>
      <Anecdote
        anecdote={anecdotes[selected].anecdote}
        votes={upVotes[selected]}
      />
      <Button name="next anecdote" handleClick={() => setRandomAnecdote()} />
      <Button name="👍" handleClick={() => upVoteAnecdote(selected)} />
    </div>
  );
};

export default App;
