export const notificationChange = (notification) => {
  return {
    type: "SET_NOTIFICATION",
    notification: notification,
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
