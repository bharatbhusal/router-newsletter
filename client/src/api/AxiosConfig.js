import axios from "axios";
import config from "../config";

const API = axios.create({
	baseURL: config.VITE_APP_BACKEND_URL,
	withCredentials: true, // Ensure credentials (cookies) are sent with requests
});

API.interceptors.request.use(async (config) => {
	try {
		const authToken = document.cookie
			.split("; ")
			.find((row) => row.startsWith("authToken="))
			?.split("=")[1];

		if (authToken) {
			config.headers.Authorization = `Bearer ${authToken}`;
		}
	} catch (error) {
		console.error("Error while setting auth token:", error);
	}
	return config;
});

API.interceptors.response.use(
	(response) => response.data,
	(error) => {
		// Global error handling logic
		throw error;
	}
);

export default API;
