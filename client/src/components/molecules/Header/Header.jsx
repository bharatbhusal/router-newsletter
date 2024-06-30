// Header.jsx

import React from "react";
import "./Header.css"; // Import CSS file for styling
import Logo from "../../atoms/Logo/Logo"; // Import Logo component
import Button from "../../atoms/Button/Button"; // Import Button component

const Header = () => {
	return (
		<header className="header">
			<div className="logo-container">
				<Logo type="circular" alt="Company Logo" />
			</div>
			<nav className="nav">
				<Button type="anchor" label={"Home"} />
				<Button type="anchor" label={"About"} />
				<Button type="anchor" label={"Services"} />
				<Button type="anchor" label={"Contact"} />
			</nav>
		</header>
	);
};

export default Header;
