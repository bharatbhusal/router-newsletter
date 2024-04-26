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
			return data;
		} else {
			throw new Error(data.message || "Failed to signup");
		}
	} catch (error) {
		throw new Error(error.message || "Failed to signup");
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
			return data; // Return the token received from the backend
		} else {
			throw new Error(data.message || "Failed to login");
		}
	} catch (error) {
		throw new Error(error.message || "Failed to login");
	}
};

// Export the functions
export { signup, login };
