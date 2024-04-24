import React, { Fragment } from "react";
import "./App.css";

import InputNews from "./components/InputNews";
import ListNews from "./components/ListNews";
const App = () => {
	const today = new Date();
	const day = today.getDate();
	return (
		<Fragment>
			<div className="container">
				<h1 className="text-center mt-5">
					Router Protocol Daily Newsletter
				</h1>
				<InputNews />
				<ListNews day={day} />
			</div>
		</Fragment>
	);
};

export default App;
