import produce from "immer";
import {
	MEDIA_UPLOAD_START,
	MEDIA_UPLOAD_SUCCESS,
	MEDIA_UPLOAD_FAIL,
	MEDIA_RETRIEVE_START,
	MEDIA_RETRIEVE_SUCCESS,
	MEDIA_RETRIEVE_FAIL,
	MEDIA_DELETE_START,
	MEDIA_DELETE_SUCCESS,
	MEDIA_DELETE_FAIL,
	MEDIA_UPDATE_START,
	MEDIA_UPDATE_SUCCESS,
	MEDIA_UPDATE_FAIL,
} from "./actions/actionTypes";

const initialState = {
	uploading: false,
	retrieving: false,
	deleting: false,
	updating: false,
	media: null,
	error: null,
};

const mediaReducer = (state = initialState, action) => {
	return produce(state, (draft) => {
		switch (action.type) {
			case MEDIA_UPLOAD_START:
				draft.uploading = true;
				draft.error = null;
				break;
			case MEDIA_UPLOAD_SUCCESS:
				draft.uploading = false;
				draft.error = null;
				break;
			case MEDIA_UPLOAD_FAIL:
				draft.uploading = false;
				draft.error = action.error;
				break;
			case MEDIA_RETRIEVE_START:
				draft.retrieving = true;
				draft.error = null;
				break;
			case MEDIA_RETRIEVE_SUCCESS:
				draft.retrieving = false;
				draft.media = action.data;
				draft.error = null;
				break;
			case MEDIA_RETRIEVE_FAIL:
				draft.retrieving = false;
				draft.error = action.error;
				break;
			case MEDIA_DELETE_START:
				draft.deleting = true;
				draft.error = null;
				break;
			case MEDIA_DELETE_SUCCESS:
				draft.deleting = false;
				draft.media = null; // Update state as needed after deletion
				draft.error = null;
				break;
			case MEDIA_DELETE_FAIL:
				draft.deleting = false;
				draft.error = action.error;
				break;
			case MEDIA_UPDATE_START:
				draft.updating = true;
				draft.error = null;
				break;
			case MEDIA_UPDATE_SUCCESS:
				draft.updating = false;
				draft.media = action.data; // Update state as needed after updating
				draft.error = null;
				break;
			case MEDIA_UPDATE_FAIL:
				draft.updating = false;
				draft.error = action.error;
				break;
			default:
				break;
		}
	});
};

export default mediaReducer;
