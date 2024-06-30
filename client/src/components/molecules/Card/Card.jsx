// Card.jsx
import React from "react";
import PropTypes from "prop-types";
import "./Card.css";

const Card = ({ title, description }) => {
	return (
		<div className="card">
			<h2 className="card-title">{title}</h2>
			<p className="card-description">{description}</p>
		</div>
	);
};

Card.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
};

export default Card;
