import axios from "axios";
import config from "../../config";

const API = axios.create({
	baseURL: config.VITE_APP_BACKEND_URL,
});

API.interceptors.request.use((config) => {
	const token = localStorage.getItem("token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
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
