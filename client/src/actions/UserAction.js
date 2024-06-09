import * as UserApi from "../api/UserRequest";
import {
	USER_RETRIEVE_START,
	USER_RETRIEVE_SUCCESS,
	USER_RETRIEVE_FAIL,
	USER_UPDATE_START,
	USER_UPDATE_SUCCESS,
	USER_UPDATE_FAIL,
	USER_COUNT_START,
	USER_COUNT_SUCCESS,
	USER_COUNT_FAIL,
} from "./ActionTypes";

const handleAsyncUserAction =
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

// Retrieve user
export const getUser = (userId) =>
	handleAsyncUserAction(
		() => UserApi.getUser(userId),
		USER_RETRIEVE_START,
		USER_RETRIEVE_SUCCESS,
		USER_RETRIEVE_FAIL
	);

// Update user
export const updateUser = (id, formData) =>
	handleAsyncUserAction(
		() => UserApi.updateUser(id, formData),
		USER_UPDATE_START,
		USER_UPDATE_SUCCESS,
		USER_UPDATE_FAIL
	);

// Retrieve all users
export const getAllUsers = () =>
	handleAsyncUserAction(
		UserApi.getAllUsers,
		USER_RETRIEVE_START,
		USER_RETRIEVE_SUCCESS,
		USER_RETRIEVE_FAIL
	);

// Retrieve all reporters
export const getAllReporters = () =>
	handleAsyncUserAction(
		UserApi.getAllReporters,
		USER_RETRIEVE_START,
		USER_RETRIEVE_SUCCESS,
		USER_RETRIEVE_FAIL
	);

// Count users
export const countUsers = () =>
	handleAsyncUserAction(
		UserApi.countUsers,
		USER_COUNT_START,
		USER_COUNT_SUCCESS,
		USER_COUNT_FAIL
	);

// Count admins
export const countAdmins = () =>
	handleAsyncUserAction(
		UserApi.countAdmins,
		USER_COUNT_START,
		USER_COUNT_SUCCESS,
		USER_COUNT_FAIL
	);
