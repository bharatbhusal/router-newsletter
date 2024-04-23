import { createRoot } from "react-dom/client";
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import App from "./App";
import "./index.css";
import MonthlyView from "./components/MonthlyView";
import NotFoundPage from "./components/NotFoundPage";
import { months } from "./utils/months";

const initializeApp = async () => {
	// const monthData = await Promise.all(monthDataPromises);

	// Getting the DOM element with the id "root"
	const divContainer = document.getElementById("root");

	// Creating a root for the React application using createRoot and associating it with the divContainer
	const root = createRoot(divContainer);

	const router = createBrowserRouter([
		{
			path: "",
			element: <App />,
			errorElement: <NotFoundPage />,
			children: [
				{
					errorElement: <NotFoundPage />,
					children: [
						{
							index: true,
							element: <MonthlyView />,
						},
						...Object.values(months).map((month, index) => ({
							path: month.toLowerCase(),
							element: (
								<MonthlyView
									month={index + 1} // Add the month key here
								/>
							),
						})),
					],
				},
			],
		},
	]);

	// Rendering the main App component within the root
	root.render(<RouterProvider router={router} />);
};

// Initialize the app
initializeApp();
