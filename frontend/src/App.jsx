import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import { NavBar } from "./components/NavBar";

const App = () => {
	return (
		<Fragment>
			<NavBar />
			<div className="container" style={{ maxWidth: "700px" }}>
				<Outlet />
			</div>
		</Fragment>
	);
};

export default App;
