import API from "./axiosConfig";

export const getUser = (userId) =>
	API.get(`/user/${userId}`)
		.then((response) => {
			return response;
		})
		.catch((error) => {
			throw error;
		});

export const getAllUsers = () =>
	API.get("/user")
		.then((response) => {
			return response;
		})
		.catch((error) => {
			throw error;
		});

export const getAdmins = () =>
	API.get("/user/admins")
		.then((response) => {
			return response;
		})
		.catch((error) => {
			throw error;
		});

export const countUsers = () =>
	API.get(`/user/count`)
		.then((response) => {
			return response;
		})
		.catch((error) => {
			throw error;
		});

export const countAdmins = () =>
	API.get(`/user/count/admins`)
		.then((response) => {
			return response;
		})
		.catch((error) => {
			throw error;
		});
