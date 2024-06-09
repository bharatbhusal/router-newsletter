import * as AuthApi from "../api/AuthRequest";
import {
	AUTH_START,
	AUTH_SUCCESS,
	AUTH_FAIL,
	LOGOUT_START,
	LOGOUT_SUCCESS,
	LOGOUT_FAIL,
} from "./ActionTypes";

// Handler function
const handleAsyncAuthAction =
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

// Auth actions
export const logIn = (formData) =>
	handleAsyncAuthAction(
		() => AuthApi.logIn(formData),
		AUTH_START,
		AUTH_SUCCESS,
		AUTH_FAIL
	);

export const signUp = (formData) =>
	handleAsyncAuthAction(
		() => AuthApi.signUp(formData),
		AUTH_START,
		AUTH_SUCCESS,
		AUTH_FAIL
	);

export const logOut = () =>
	handleAsyncAuthAction(
		AuthApi.logOut,
		LOGOUT_START,
		LOGOUT_SUCCESS,
		LOGOUT_FAIL
	);
