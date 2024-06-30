// CardList.jsx
import React from "react";
import PropTypes from "prop-types";
import Card from "../../molecules/Card/Card";
import "./CardList.css";

const CardList = ({ cards }) => {
	return (
		<div className="card-list">
			{cards.map((card, index) => (
				<Card
					key={index}
					title={card.title}
					description={card.description}
				/>
			))}
		</div>
	);
};

CardList.propTypes = {
	cards: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string.isRequired,
			description: PropTypes.string.isRequired,
		})
	).isRequired,
};

export default CardList;
