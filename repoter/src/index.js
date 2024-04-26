// Importing necessary libraries and components
import React from "react";
import { createRoot } from "react-dom/client";
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import App from "./App";
import {
	LogIn,
	SignUp,
	ForgotPassword,
} from "./components/Auth";
import { DateProvider } from "./context/dateContext";
import { NewsProvider } from "./context/newsContext";
import AddNews from "./components/AddNews";
import ListNews from "./components/ListNews";
import PageNotFound from "./components/PageNotFound";

import "./index.css";

// Getting the DOM element with the id "root"
const divContainer = document.getElementById("root");

// Creating a root for the React application using createRoot and associating it with the divContainer
const root = createRoot(divContainer);

// Creating a router with routes for different pages
const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <PageNotFound />,
		children: [
			{
				path: "/",
				element: (
					<>
						{localStorage.getItem("user-jwt-token") ? (
							<AddNews />
						) : (
							<></>
						)}
						<ListNews />
					</>
				),
			},
			{ path: "/login", element: <LogIn /> },
			{ path: "/signup", element: <SignUp /> },
			{ path: "/reset", element: <ForgotPassword /> },
		],
	},
]);

// Rendering the main App component within the root
root.render(
	<NewsProvider>
		<DateProvider>
			<RouterProvider router={router} />
		</DateProvider>
	</NewsProvider>
);
