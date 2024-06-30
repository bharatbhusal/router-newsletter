// TableCell.stories.jsx

import React from "react";
import TableCell from "./TableCell";

export default {
	title: "Components/TableCell", // Title of the story category in Storybook UI
	component: TableCell, // Component being documented
	argTypes: {
		content: { control: "text" }, // Control for content prop
		numeric: { control: "boolean" }, // Control for numeric prop
	},
};

// Template for the table cell component
const Template = (args) => <TableCell {...args} />;

// Default TableCell
export const Default = Template.bind({});
Default.args = {
	content: "Cell Content",
	numeric: false,
};

// Numeric TableCell
export const Numeric = Template.bind({});
Numeric.args = {
	content: "123",
	numeric: true,
};
