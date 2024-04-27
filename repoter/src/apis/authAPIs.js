import { toast } from "react-toastify";
import env from "../utils/validateEnv";
// Function for user signup
const signup = async (userData) => {
	try {
		const response = await fetch(
			`${env.REACT_APP_SERVER_URL}/auth/signup`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(userData),
			}
		);
		const data = await response.json();
		if (response.ok) {
			console.log(data);
			toast.success(data.message);
			return data;
		} else {
			throw new Error(data.message || "Failed to signup");
		}
	} catch (error) {
		console.log(error.message);
		toast.error(error.message || "Failed to signup");
	}
};

// Function for user login
const login = async (credentials) => {
	try {
		const response = await fetch(
			`${env.REACT_APP_SERVER_URL}/auth/login`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(credentials),
			}
		);
		const data = await response.json();
		if (response.ok) {
			console.log(data);
			toast.success(data.message);
			return data;
		} else {
			throw new Error(data.message || "Failed to login");
		}
	} catch (error) {
		console.error(error.message);
		toast.error(error.message);
	}
};

// Export the functions
export { signup, login };
