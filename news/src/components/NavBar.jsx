import React, { useState } from "react";
import RouterLogo from "../assets/logo.svg";
import { NavLink } from "react-router-dom";
import { months } from "../utils/months";

const NavBar = () => {
	const [isDropdownOpen, setIsDropdownOpen] =
		useState(false);

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	return (
		<nav>
			<a
				href="https://www.routerprotocol.com/"
				target="_blank"
			>
				<img src={RouterLogo} alt="router logo" />
			</a>
			<div
				className="month flex space-around"
				onClick={toggleDropdown}
			>
				Month
				{isDropdownOpen && (
					<div className="months">
						{Object.entries(months).map(([key, value], index) => (
							<NavLink key={index} to={`/${value}`}>
								{value}
							</NavLink>
						))}
					</div>
				)}
			</div>
		</nav>
	);
};

export default NavBar;
