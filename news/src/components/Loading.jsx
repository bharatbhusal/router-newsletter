import React from "react";
import { Link } from "react-router-dom"; // If you're using React Router

const FuturePage = () => {
	return (
		<div className="error flex space-around">
			<div className="content">
				<h1 className="heading">It's us, not you:(</h1>
				<p className="message">
					Oops! The page you're looking for is taking longer than
					expected.
				</p>
				<Link to="/" className="link">
					Please or go back to Home
				</Link>
			</div>
		</div>
	);
};

export default FuturePage;
