import * as UserApi from "../../api/userRequest";
import {
	USER_RETRIEVE_START,
	USER_RETRIEVE_SUCCESS,
	USER_RETRIEVE_FAIL,
	USER_COUNT_START,
	USER_COUNT_SUCCESS,
	USER_COUNT_FAIL,
} from "./actionTypes";

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

// Retrieve all users
export const getAllUsers = () =>
	handleAsyncUserAction(
		UserApi.getAllUsers,
		USER_RETRIEVE_START,
		USER_RETRIEVE_SUCCESS,
		USER_RETRIEVE_FAIL
	);

// Retrieve all reporters
export const getAdmins = () =>
	handleAsyncUserAction(
		UserApi.getAdmins,
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
