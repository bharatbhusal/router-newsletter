import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";

const App = () => {
	return (
		<Fragment>
			<div className="container">
				<h1 className="text-center mt-5">
					Router Protocol Daily Newsletter
				</h1>
				<Outlet />
			</div>
		</Fragment>
	);
};

export default App;
