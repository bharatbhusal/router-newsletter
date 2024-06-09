import { produce } from "immer";
import {
	AUTH_START,
	AUTH_SUCCESS,
	AUTH_FAIL,
	LOGOUT_START,
	LOGOUT_SUCCESS,
	LOGOUT_FAIL,
} from "../actions/ActionTypes";

const initialState = {
	authData: null,
	loading: false,
	error: null,
	logoutLoading: false,
	retrieving: false,
};

const authReducer = (state = initialState, action) => {
	return produce(state, (draft) => {
		switch (action.type) {
			case AUTH_START:
				draft.loading = true;
				draft.error = null;
				break;
			case AUTH_SUCCESS:
				draft.authData = action.response;
				draft.loading = false;
				draft.error = null;
				break;
			case AUTH_FAIL:
				draft.loading = false;
				draft.error = action.error;
				break;
			case LOGOUT_START:
				draft.logoutLoading = true;
				draft.error = null;
				break;
			case LOGOUT_SUCCESS:
				draft.authData = null;
				draft.logoutLoading = false;
				draft.error = null;
				break;
			case LOGOUT_FAIL:
				draft.logoutLoading = false;
				draft.error = action.error;
				break;
			default:
				break;
		}
	});
};

export default authReducer;
