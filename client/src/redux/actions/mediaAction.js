import * as MediaApi from "../../api/mediaRequest";
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
} from "./actionTypes";

const handleAsyncMediaAction =
	(
		apiFunction,
		startActionType,
		successActionType,
		failActionType
	) =>
	async (dispatch) => {
		dispatch({ type: startActionType });

		try {
			const data = await apiFunction();
			dispatch({ type: successActionType, data });
			return data;
		} catch (error) {
			console.error("Error:", error);
			dispatch({ type: failActionType });
			throw error;
		}
	};

export const uploadMedia = (formData) =>
	handleAsyncMediaAction(
		() => MediaApi.uploadMedia(formData),
		MEDIA_UPLOAD_START,
		MEDIA_UPLOAD_SUCCESS,
		MEDIA_UPLOAD_FAIL
	);

export const getMedia = (mediaId) =>
	handleAsyncMediaAction(
		() => MediaApi.getMedia(mediaId),
		MEDIA_RETRIEVE_START,
		MEDIA_RETRIEVE_SUCCESS,
		MEDIA_RETRIEVE_FAIL
	);

export const deleteMedia = (mediaId) =>
	handleAsyncMediaAction(
		() => MediaApi.deleteMedia(mediaId),
		MEDIA_DELETE_START,
		MEDIA_DELETE_SUCCESS,
		MEDIA_DELETE_FAIL
	);

export const updateMedia = (mediaId, formData) =>
	handleAsyncMediaAction(
		() => MediaApi.updateMedia(mediaId, formData),
		MEDIA_UPDATE_START,
		MEDIA_UPDATE_SUCCESS,
		MEDIA_UPDATE_FAIL
	);
