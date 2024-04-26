// usersAPIs.js

// Function to create a new user
const createUser = async (userData) => {
	try {
		const response = await fetch(
			`${env.REACT_APP_SERVER_URL}/users`,
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
			throw new Error(data.message || "Failed to create user");
		}
	} catch (error) {
		throw new Error(error.message || "Failed to create user");
	}
};

// Function to get all users
const getUsers = async () => {
	try {
		const response = await fetch(
			`${env.REACT_APP_SERVER_URL}/users`,
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${localStorage.getItem(
						"user-jwt-token"
					)}`,

					"Content-Type": "application/json",
				},
			}
		);
		const data = await response.json();
		if (response.ok) {
			return data;
		} else {
			throw new Error(data.message || "Failed to fetch users");
		}
	} catch (error) {
		throw new Error(error.message || "Failed to fetch users");
	}
};

// Function to get a user by ID
const getUserById = async (userId) => {
	try {
		const response = await fetch(
			`${env.REACT_APP_SERVER_URL}/users/${userId}`,
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${localStorage.getItem(
						"user-jwt-token"
					)}`,

					"Content-Type": "application/json",
				},
			}
		);
		const data = await response.json();
		if (response.ok) {
			return data;
		} else {
			throw new Error(data.message || "Failed to fetch user");
		}
	} catch (error) {
		throw new Error(error.message || "Failed to fetch user");
	}
};

// Function to update a user by ID
const updateUserById = async (userId, userData) => {
	try {
		const response = await fetch(
			`${env.REACT_APP_SERVER_URL}/users/${userId}`,
			{
				method: "PUT",
				headers: {
					Authorization: `Bearer ${localStorage.getItem(
						"user-jwt-token"
					)}`,

					"Content-Type": "application/json",
				},
				body: JSON.stringify(userData),
			}
		);
		const data = await response.json();
		if (response.ok) {
			return data;
		} else {
			throw new Error(data.message || "Failed to update user");
		}
	} catch (error) {
		throw new Error(error.message || "Failed to update user");
	}
};

// Function to delete a user by ID
const deleteUserById = async (userId) => {
	try {
		const response = await fetch(
			`${env.REACT_APP_SERVER_URL}/users/${userId}`,
			{
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${localStorage.getItem(
						"user-jwt-token"
					)}`,

					"Content-Type": "application/json",
				},
			}
		);
		const data = await response.json();
		if (response.ok) {
			return data;
		} else {
			throw new Error(data.message || "Failed to delete user");
		}
	} catch (error) {
		throw new Error(error.message || "Failed to delete user");
	}
};

export {
	createUser,
	getUsers,
	getUserById,
	updateUserById,
	deleteUserById,
};
