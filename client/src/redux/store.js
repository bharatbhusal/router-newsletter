// store/index.js
import {
	legacy_createStore as createStore,
	applyMiddleware,
	compose,
} from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "./reducers/index"; // Adjust the path as needed
import {
	saveToLocalStorage,
	loadFromLocalStorage,
} from "../utils/localStorage"; // Adjust the path as needed

const composeEnhancers =
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedState = loadFromLocalStorage("reduxState");

const store = createStore(
	rootReducer,
	persistedState,
	composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(() =>
	saveToLocalStorage("reduxState", store)
);

export default store;
