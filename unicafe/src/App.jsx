import React, { useState } from "react";

const Button = ({ name, handleClick }) => (
  <button onClick={handleClick}>{name}</button>
);

const Statistics = ({ good, neutral, bad }) => {
  const all = good + bad + neutral;
  const average = (all / 3).toFixed(2);
  const positive = `${Math.floor((good / all) * 100)}%`;
  return (
    <>
      <h2>Statistics</h2>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {all}</p>
      <p>Average: {average}</p>
      <p>Positive: {positive}</p>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const incriment = (value, setter) => {
    setter(value + 1);
  };

  return (
    <div>
      <h1>Unicafe</h1>
      <h2>Give Feedback</h2>
      <div>
        <Button name="good" handleClick={() => incriment(good, setGood)} />
        <Button
          name="neutral"
          handleClick={() => incriment(neutral, setNeutral)}
        />
        <Button name="bad" handleClick={() => incriment(bad, setBad)} />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
