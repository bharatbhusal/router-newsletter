import { produce } from "immer";
import {
	POST_UPLOAD_START,
	POST_UPLOAD_SUCCESS,
	POST_UPLOAD_FAIL,
	POST_RETRIEVE_START,
	POST_RETRIEVE_SUCCESS,
	POST_RETRIEVE_FAIL,
	POST_DELETE_START,
	POST_DELETE_SUCCESS,
	POST_DELETE_FAIL,
	POST_UPDATE_START,
	POST_UPDATE_SUCCESS,
	POST_UPDATE_FAIL,
} from "../actions/actionTypes";

const initialState = {
	posts: [],
	loading: false,
	error: false,
	uploading: false,
	updating: false,
	deleting: false,
};

const postReducer = (state = initialState, action) => {
	return produce(state, (draft) => {
		switch (action.type) {
			case POST_UPLOAD_START:
				draft.uploading = true;
				draft.error = false;
				break;
			case POST_UPLOAD_SUCCESS:
				draft.posts.unshift(action.data);
				draft.uploading = false;
				draft.error = false;
				break;
			case POST_UPLOAD_FAIL:
				draft.uploading = false;
				draft.error = true;
				break;

			case POST_RETRIEVE_START:
				draft.loading = true;
				draft.error = false;
				break;
			case POST_RETRIEVE_SUCCESS:
				draft.posts = action.response;
				draft.loading = false;
				draft.error = false;
				break;
			case POST_RETRIEVE_FAIL:
				draft.loading = false;
				draft.error = true;
				break;

			case POST_DELETE_START:
				draft.deleting = true;
				draft.error = false;
				break;
			case POST_DELETE_SUCCESS:
				draft.posts = draft.posts.filter(
					(post) => post._id !== action.response._id
				);
				draft.deleting = false;
				draft.error = false;
				break;
			case POST_DELETE_FAIL:
				draft.deleting = false;
				draft.error = true;
				break;

			case POST_UPDATE_START:
				draft.updating = true;
				draft.error = false;
				break;
			case POST_UPDATE_SUCCESS:
				const index = draft.posts.findIndex(
					(post) => post._id === action.response._id
				);
				if (index !== -1) {
					draft.posts[index] = action.data;
				}
				draft.updating = false;
				draft.error = false;
				break;
			case POST_UPDATE_FAIL:
				draft.updating = false;
				draft.error = true;
				break;

			default:
				break;
		}
	});
};

export default postReducer;
