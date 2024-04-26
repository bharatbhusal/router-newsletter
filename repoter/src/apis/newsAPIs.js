import env from "../utils/validateEnv";

// Function to add a new news item
const addNews = async (newsData) => {
	try {
		const response = await fetch(
			`${env.REACT_APP_SERVER_URL}/news`,
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${localStorage.getItem(
						"user-jwt-token"
					)}`,

					"Content-Type": "application/json",
				},
				body: JSON.stringify(newsData),
			}
		);
		const jsonData = await response.json();
		if (response.ok) {
			return jsonData;
		} else {
			throw new Error(
				jsonData.message || "Failed to add news"
			);
		}
	} catch (error) {
		throw new Error(error.message || "Failed to add news");
	}
};

// Function to fetch news data for a specific date
const getNewsByDate = async (year, month, day) => {
	try {
		const response = await fetch(
			`${env.REACT_APP_SERVER_URL}/news/${year}/${month}/${day}`
		);
		const jsonData = await response.json();
		if (response.ok) {
			return jsonData;
		} else {
			throw new Error(
				jsonData.message || "Failed to fetch news"
			);
		}
	} catch (error) {
		throw new Error(error.message || "Failed to fetch news");
	}
};

// Function to delete a news item by ID
const deleteNewsById = async (id) => {
	try {
		await fetch(`${env.REACT_APP_SERVER_URL}/news/${id}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${localStorage.getItem(
					"user-jwt-token"
				)}`,
				"Content-Type": "application/json",
			},
		});
	} catch (error) {
		throw new Error(error.message || "Failed to delete news");
	}
};

// Function to update news data by ID
const updateNewsById = async (id, updatedNews) => {
	try {
		const response = await fetch(
			`${env.REACT_APP_SERVER_URL}/news/${id}`,
			{
				method: "PUT",
				headers: {
					Authorization: `Bearer ${localStorage.getItem(
						"user-jwt-token"
					)}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updatedNews),
			}
		);
		const jsonData = await response.json();
		if (response.ok) {
			return jsonData;
		} else {
			throw new Error(
				jsonData.message || "Failed to update news"
			);
		}
	} catch (error) {
		throw new Error(error.message || "Failed to update news");
	}
};

export {
	addNews,
	getNewsByDate,
	deleteNewsById,
	updateNewsById,
};
