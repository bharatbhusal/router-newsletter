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
import AddNews from "./components/AddNews";
import ListNews from "./components/ListNews";
import PageNotFound from "./components/PageNotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { register } from "./serviceWorker"; // Import the register function
import "./index.css";

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
			{ path: "/reset", element: <ForgotPassword /> },
		],
	},
]);

root.render(
	<NewsProvider>
		<DateProvider>
			<ToastContainer />
			<RouterProvider router={router} />
		</DateProvider>
	</NewsProvider>
);

// Register the service worker
register();
