import React from "react";
import PropTypes from "prop-types";
import "./HomeTemplate.css";

const HomeTemplate = ({ header, mainContent, footer }) => {
	return (
		<div className="home-template">
			<header className="home-template-header">
				{header}
			</header>
			<main className="home-template-main">{mainContent}</main>
			<footer className="home-template-footer">
				{footer}
			</footer>
		</div>
	);
};

HomeTemplate.propTypes = {
	header: PropTypes.node.isRequired,
	mainContent: PropTypes.node.isRequired,
	footer: PropTypes.node.isRequired,
};

export default HomeTemplate;
