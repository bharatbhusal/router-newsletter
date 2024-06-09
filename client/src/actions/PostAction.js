import * as PostApi from "../api/PostRequest";
import {
	POST_RETRIEVE_START,
	POST_RETRIEVE_SUCCESS,
	POST_RETRIEVE_FAIL,
	POST_UPLOAD_START,
	POST_UPLOAD_SUCCESS,
	POST_UPLOAD_FAIL,
	POST_UPDATE_START,
	POST_UPDATE_SUCCESS,
	POST_UPDATE_FAIL,
	POST_DELETE_START,
	POST_DELETE_SUCCESS,
	POST_DELETE_FAIL,
} from "./ActionTypes";

// Handler function
const handleAsyncPostAction =
	(
		apiFunction,
		startActionType,
		successActionType,
		failActionType
	) =>
	async (dispatch) => {
		dispatch({ type: startActionType });
		console.log("Dispatched start action:", startActionType);

		try {
			const response = await apiFunction();
			dispatch({ type: successActionType, response });
			console.log(
				"Dispatched success action:",
				successActionType,
				"with response:",
				response
			);

			return response;
		} catch (error) {
			dispatch({ type: failActionType });
			console.log("Dispatched fail action:", failActionType);
			throw error;
		}
	};

export const getMyPosts = (id) =>
	handleAsyncPostAction(
		() => PostApi.getMyPosts(id),
		POST_RETRIEVE_START,
		POST_RETRIEVE_SUCCESS,
		POST_RETRIEVE_FAIL
	);

export const getTodayPosts = () =>
	handleAsyncPostAction(
		PostApi.getTodayPosts,
		POST_RETRIEVE_START,
		POST_RETRIEVE_SUCCESS,
		POST_RETRIEVE_FAIL
	);

export const getThisWeekPosts = () =>
	handleAsyncPostAction(
		PostApi.getThisWeekPosts,
		POST_RETRIEVE_START,
		POST_RETRIEVE_SUCCESS,
		POST_RETRIEVE_FAIL
	);

export const getThisMonthPosts = () =>
	handleAsyncPostAction(
		PostApi.getThisMonthPosts,
		POST_RETRIEVE_START,
		POST_RETRIEVE_SUCCESS,
		POST_RETRIEVE_FAIL
	);

export const getThisYearPosts = () =>
	handleAsyncPostAction(
		PostApi.getThisYearPosts,
		POST_RETRIEVE_START,
		POST_RETRIEVE_SUCCESS,
		POST_RETRIEVE_FAIL
	);

// Upload post
export const uploadPost = (postData) =>
	handleAsyncPostAction(
		() => PostApi.uploadPost(postData),
		POST_UPLOAD_START,
		POST_UPLOAD_SUCCESS,
		POST_UPLOAD_FAIL
	);

// Update post
export const updatePost = (postId, updatedData) =>
	handleAsyncPostAction(
		() => PostApi.updatePost(postId, updatedData),
		POST_UPDATE_START,
		POST_UPDATE_SUCCESS,
		POST_UPDATE_FAIL
	);

// Delete post
export const deletePost = (postId, userId) =>
	handleAsyncPostAction(
		() => PostApi.deletePost(postId, { userId }),
		POST_DELETE_START,
		POST_DELETE_SUCCESS,
		POST_DELETE_FAIL
	);
