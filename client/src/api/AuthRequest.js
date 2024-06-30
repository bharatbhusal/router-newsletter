import API from "./axiosConfig";

// API function for logging in
export const logIn = (formData) =>
	API.post("/auth/login", formData)
		.then((response) => {
			return response;
		})
		.catch((error) => {
			throw error;
		});

// API function for signing up
export const signUp = (formData) =>
	API.post("/auth/register", formData)
		.then((response) => {
			return response;
		})
		.catch((error) => {
			throw error;
		});

export const updateUser = (formData) =>
	API.put(`/user`, formData)
		.then((response) => {
			return response;
		})
		.catch((error) => {
			throw error;
		});

// API function for logging out
export const logOut = () =>
	API.post("/auth/logout")
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			throw error;
		});
