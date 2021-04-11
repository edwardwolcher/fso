class Notification {
  constructor(text, type, timeout) {
    this.text = text;
    this.type = type;
    this.timeout = timeout;
  }
  clear() {
    clearTimeout(this.timeout);
  }
}

export const notify = (dispatch, text, type = "ok", duration = 5) => {
  const timeout = setTimeout(() => {
    dispatch({
      type: "SET_NOTIFICATION",
      data: null,
    });
  }, duration * 1000);
  const notification = new Notification(text, type, timeout);
  dispatch({
    type: "SET_NOTIFICATION",
    data: notification,
  });
};

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      if (state) state.clear();
      return action.data;
    default:
      return state;
  }
};

export default notificationReducer;
