export const setNotification = (notification, duration = 5) => {
  return (dispatch) => {
    console.log("here");
    const timeout = setTimeout(() => {
      dispatch(clearNotification());
    }, duration * 1000);
    dispatch({
      type: "SET_NOTIFICATION",
      data: { notification: notification, timeout: timeout },
    });
  };
};

export const clearNotification = () => {
  return {
    type: "CLEAR_NOTIFICATION",
  };
};

const clear = { timeout: null, notification: "" };

const notificationReducer = (state = clear, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      if (state.timeout) clearTimeout(state.timeout);
      return action.data;
    case "CLEAR_NOTIFICATION":
      return clear;
    default:
      return state;
  }
};

export default notificationReducer;
