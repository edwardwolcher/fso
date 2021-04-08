import anecdoteService from "../services/anecdotes";

// Utility Functions
const getId = () => (100000 * Math.random()).toFixed(0);

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

// Event Dispatchers
export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdoteObject = asObject(content);
    const anecdote = await anecdoteService.createNew(anecdoteObject);
    dispatch({
      type: "NEW_ANECDOTE",
      data: anecdote,
    });
  };
};

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const update = { ...anecdote, votes: anecdote.votes + 1 };
    const updatedAnecdote = await anecdoteService.update(update);
    dispatch({ type: "VOTE", data: { id: updatedAnecdote.id } });
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT_NOTES",
      data: anecdotes,
    });
  };
};

const initialState = [];

const anecdoteReducer = (state = initialState, action) => {
  const newState = [...state];
  switch (action.type) {
    case "NEW_ANECDOTE":
      newState.push(action.data);
      return newState;
    case "VOTE":
      const index = newState.findIndex((a) => a.id === action.data.id);
      newState[index].votes += 1;
      return newState;
    case "INIT_NOTES":
      return action.data;
    default:
      return newState;
  }
};

export default anecdoteReducer;
