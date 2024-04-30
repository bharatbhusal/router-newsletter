// index.js

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
import { UserProvider } from "./context/userContext";
import AddNews from "./components/AddNews";
import ListNews from "./components/ListNews";
import PageNotFound from "./components/PageNotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { register } from "./serviceWorker"; // Import the register function
import "./index.css";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";
import Contributors from "./components/Contributors";

const divContainer = document.getElementById("root");
const root = createRoot(divContainer);

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
						<AddNews />
						<ListNews />
					</>
				),
			},
			{ path: "/login", element: <LogIn /> },
			{ path: "/signup", element: <SignUp /> },
			// userMenu
			{ path: "/profile", element: <Profile /> },
			{
				path: "/dashboard",
				element: <Dashboard />,
			},

			//pagesMenu
			{
				path: "/contributors",
				element: <Contributors />,
			},
			{ path: "/about-us", element: <>Hi this is About Us</> },
			{ path: "/donate", element: <>Hi this is Donate</> },

			{ path: "/reset", element: <ForgotPassword /> },
		],
	},
]);

root.render(
	<UserProvider>
		<NewsProvider>
			<DateProvider>
				<ToastContainer />
				<RouterProvider router={router} />
			</DateProvider>
		</NewsProvider>
	</UserProvider>
);

// Register the service worker
register();
