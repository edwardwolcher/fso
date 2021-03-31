import React, { useState } from "react";

const Button = ({ name, handleClick }) => (
  <button onClick={handleClick}>{name}</button>
);

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
      <h2>Statistics</h2>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
    </div>
  );
};

export default App;
