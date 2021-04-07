const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

// Utility Functions
const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

// Event Dispatchers
export const createAnecdote = (anecdote) => {
  return {
    type: "NEW_ANECDOTE",
    data: asObject(anecdote),
  };
};

export const voteAnecdote = (id) => {
  return {
    type: "VOTE",
    data: { id: id },
  };
};

const initialState = anecdotesAtStart.map(asObject);

const reducer = (state = initialState, action) => {
  const newState = [...state];
  switch (action.type) {
    case "NEW_ANECDOTE":
      newState.push(action.data);
      return newState;
    case "VOTE":
      const index = newState.findIndex((a) => a.id === action.data.id);
      newState[index].votes += 1;
      return newState;
    default:
      return newState;
  }
};

export default reducer;
