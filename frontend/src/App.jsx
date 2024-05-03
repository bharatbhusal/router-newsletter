import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";

const App = () => {
	return (
		<Fragment>
			<Header />
			<div className="container">
				<Outlet />
			</div>
		</Fragment>
	);
};

export default App;
