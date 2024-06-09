import { combineReducers } from "redux";
import authReducer from "./AuthReducer";
import postReducer from "./PostReducer";
import userReducer from "./UserReducer";

const rootReducer = combineReducers({
	authReducer: authReducer,
	postReducer: postReducer,
	userReducer: userReducer,
});

export default rootReducer;
