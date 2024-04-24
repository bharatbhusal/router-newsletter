import env from "./utils/validateEnv";
import localForage from "localforage";
// Create
const createOneNews = async (newsData) => {
	const response = await fetch(
		`${env.REACT_APP_SERVER_URL}/`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newsData),
		}
	);
	const data = await response.json();
	return data;
};
// Read
const getOneMonthNews = async (year, month) => {
	// Check if the news exists in localForage
	const cachedData = await localForage.getItem(
		`${year}-${month}`
	);
	if (cachedData) {
		return cachedData;
	}

	// Retrieve the data from the endpoint
	const response = await fetch(
		`${env.REACT_APP_SERVER_URL}/${year}/${month}`
	);
	const data = await response.json();

	// Store the data in localForage for future use
	await localForage.setItem(`${year}-${month}`, data);

	return data;
};

// Update
const updateOneNews = async (updateData) => {
	const response = await fetch(
		`${env.REACT_APP_SERVER_URL}/`,
		{
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updateData),
		}
	);
	const data = await response.json();
	return data;
};

// Delete
const deleteOneNews = async (source) => {
	const response = await fetch(
		`${env.REACT_APP_SERVER_URL}/`,
		{
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(source),
		}
	);
	const data = await response.json();
	return data;
};
export {
	createOneNews,
	getOneMonthNews,
	updateOneNews,
	deleteOneNews,
};
