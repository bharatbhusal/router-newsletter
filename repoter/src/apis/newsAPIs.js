import env from "../utils/validateEnv";
import { toast } from "react-toastify";

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
		const data = await response.json();
		if (response.ok) {
			console.log(data);
			toast.success(data.message);
			return data;
		} else {
			throw new Error(data.message);
		}
	} catch (error) {
		console.error(error.message);
		toast.error(error.message);
	}
};

// Function to delete a news item by ID
const deleteNewsById = async (id) => {
	try {
		const user = JSON.parse(localStorage.getItem("user"));
		const response = await fetch(
			`${env.REACT_APP_SERVER_URL}/news/${id}`,
			{
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${localStorage.getItem(
						"user-jwt-token"
					)}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ reporter: user.email }),
			}
		);
		const data = await response.json();
		if (response.ok) {
			console.log(data);
			toast.success(data.message);
			return data;
		} else {
			throw new Error(data.message || "Failed to delete news");
		}
	} catch (error) {
		console.error(error.message);
		toast.error(error.message || "Failed to delete news");
	}
};

// Function to update news data by ID
const updateNewsById = async (updatedNews) => {
	try {
		const id = updatedNews.id;
		const reporter = JSON.parse(
			localStorage.getItem("user")
		).email;
		console.log(id, reporter, updatedNews);
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
				body: JSON.stringify({ ...updatedNews, reporter }),
			}
		);
		const data = await response.json();
		console.log(data);
		if (response.ok) {
			console.log(data);
			toast.success(data.message);
			return data;
		} else {
			throw new Error(data.message || "Failed to update news");
		}
	} catch (error) {
		console.error(error.message);
		toast.error(error.message || "Failed to update news");
	}
};

export {
	addNews,
	getNewsByDate,
	deleteNewsById,
	updateNewsById,
};
