// Card.js

import React from "react";
import "./Card.css";

const Card = ({ title, content, imageUrl }) => {
	return (
		<div className="card">
			{imageUrl && (
				<img
					className="card-image"
					src={imageUrl}
					alt="Card Image"
				/>
			)}
			<div className="card-content">
				<h2 className="card-title">{title}</h2>
				<p className="card-text">{content}</p>
			</div>
		</div>
	);
};

export default Card;
