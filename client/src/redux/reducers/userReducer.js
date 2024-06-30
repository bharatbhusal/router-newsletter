import { produce } from "immer";
import {
	USER_RETRIEVE_START,
	USER_RETRIEVE_SUCCESS,
	USER_RETRIEVE_FAIL,
	USER_DELETE_START,
	USER_DELETE_SUCCESS,
	USER_DELETE_FAIL,
	USER_UPLOAD_START,
	USER_UPLOAD_SUCCESS,
	USER_UPLOAD_FAIL,
	USER_COUNT_START,
	USER_COUNT_SUCCESS,
	USER_COUNT_FAIL,
} from "../actions/actionTypes";

const initialState = {
	retrieving: false,
	updating: false,
	deleting: false,
	uploading: false,
	counting: false,
	users: [],
	error: null,
};

const userReducer = (state = initialState, action) => {
	return produce(state, (draft) => {
		switch (action.type) {
			case USER_RETRIEVE_START:
				draft.retrieving = true;
				draft.error = null;
				break;
			case USER_RETRIEVE_SUCCESS:
				draft.retrieving = false;
				draft.users = action.data;
				draft.error = null;
				break;
			case USER_RETRIEVE_FAIL:
				draft.retrieving = false;
				draft.error = action.error;
				break;
			case USER_DELETE_START:
				draft.deleting = true;
				draft.error = null;
				break;
			case USER_DELETE_SUCCESS:
				draft.deleting = false;
				draft.users = draft.users.filter(
					(user) => user.id !== action.data.id
				);
				draft.error = null;
				break;
			case USER_DELETE_FAIL:
				draft.deleting = false;
				draft.error = action.error;
				break;
			case USER_UPLOAD_START:
				draft.uploading = true;
				draft.error = null;
				break;
			case USER_UPLOAD_SUCCESS:
				draft.uploading = false;
				draft.error = null;
				break;
			case USER_UPLOAD_FAIL:
				draft.uploading = false;
				draft.error = action.error;
				break;
			case USER_COUNT_START:
				draft.counting = true;
				draft.error = null;
				break;
			case USER_COUNT_SUCCESS:
				draft.counting = false;
				// Handle count data update if needed
				draft.error = null;
				break;
			case USER_COUNT_FAIL:
				draft.counting = false;
				draft.error = action.error;
				break;
			default:
				break;
		}
	});
};

export default userReducer;
