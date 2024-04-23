import env from "./utils/validateEnv";
import localForage from "localforage";
// Read
const getOneMonthNews = async (year, month) => {
	const today = new Date();
	const currentMonth = today.getMonth() + 1;
	if (currentMonth === month) {
		// Retrieve the data from the endpoint
		const response = await fetch(
			`${env.REACT_APP_SERVER_URL}/${year}/${month}`
		);
		const data = await response.json();
		return data;
	}

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
export { getOneMonthNews };
