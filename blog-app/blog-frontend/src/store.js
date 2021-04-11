import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import notificationReducer from "./reducers/notificationReducer.js";
import loginReducer from "./reducers/loginReducer";
import blogsReducer from "./reducers/blogsReducer.js";
import usersReducer from "./reducers/usersReducer.js";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({
  login: loginReducer,
  blogs: blogsReducer,
  users: usersReducer,
  notification: notificationReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
