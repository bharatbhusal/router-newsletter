// TableCell.jsx

import React from "react";
import "./TableCell.css"; // Import CSS file for styling

const TableCell = ({ content, numeric }) => {
	const cellClass = `table-cell ${numeric ? "numeric" : ""}`;

	return <div className={cellClass}>{content}</div>;
};

export default TableCell;
