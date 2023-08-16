import { combineReducers, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productReducer } from "./reducers/productReducer";
import { userReducer } from "./reducers/userReducer"; // Import the userReducer

const reducer = combineReducers({
  products: productReducer,
  user: userReducer, // Add the userReducer to the combineReducers
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
