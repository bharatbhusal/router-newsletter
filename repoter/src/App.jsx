import React, { Fragment } from "react";
import "./App.css";

import ListNews from "./components/ListNews";
import AddNews from "./components/AddNews";
import { DateProvider } from "./context/dateContext";
import Calendar from "./components/Calendar";

const App = () => {
	return (
		<DateProvider>
			<Fragment>
				<div className="container">
					<h1 className="text-center mt-5">
						Router Protocol Daily Newsletter
					</h1>
					<AddNews />
					<ListNews />
				</div>
			</Fragment>
		</DateProvider>
	);
};

export default App;
