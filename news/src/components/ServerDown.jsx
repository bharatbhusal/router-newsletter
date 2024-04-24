import React from "react";
import { Link } from "react-router-dom"; // If you're using React Router

const ServerDown = () => {
	return (
		<div className="error flex space-around">
			<div className="content">
				<h1 className="heading">It's us, not you:(</h1>
				<p className="message">
					We are not able to connect to the server. Please try
					again later.
				</p>
			</div>
		</div>
	);
};

export default ServerDown;
