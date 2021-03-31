import React, { useState } from "react";

const Button = ({ name, handleClick }) => (
  <button onClick={handleClick}>{name}</button>
);

const Statistic = ({ label, value }) => (
  <tr>
    <td>{label}:</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const all = good + bad + neutral;

  if (all <= 0) {
    return (
      <>
        <h2>Statistics</h2>
        <p>No Feedback Given</p>
      </>
    );
  }

  const average = (all / 3).toFixed(2);
  const positive = `${Math.floor((good / all) * 100)}%`;
  return (
    <>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <Statistic label="Good" value={good.toString()} />
          <Statistic label="Neutral" value={neutral.toString()} />
          <Statistic label="Bad" value={bad.toString()} />
          <Statistic label="All" value={all.toString()} />
          <Statistic label="Average" value={average.toString()} />
          <Statistic label="Positive" value={`${positive}%`} />
        </tbody>
      </table>
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
