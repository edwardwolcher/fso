export const setNotification = (notification, timeout = 5) => {
  return (dispatch) => {
    dispatch({
      type: "SET_NOTIFICATION",
      notification: notification,
    });
    setTimeout(() => {
      dispatch(clearNotification());
    }, timeout * 1000);
  };
};

export const clearNotification = () => {
  return {
    type: "CLEAR_NOTIFICATION",
  };
};

const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.notification;
    case "CLEAR_NOTIFICATION":
      return "";
    default:
      return state;
  }
};

export default notificationReducer;
