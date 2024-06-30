// Logo.stories.jsx

import React from "react";
import Logo from "./Logo";
import "../../../variables.css";

export default {
	title: "Components/Atoms/Logo", // Title of the story category in Storybook UI
	component: Logo, // Component being documented
	argTypes: {
		type: {
			control: {
				type: "select",
				options: ["square", "circular"], // Options for logo type
			},
		},
		alt: { control: "text" }, // Control for alt text prop
	},
};

// Template for the logo component
const Template = (args) => <Logo {...args} />;

// Square Logo
export const Square = Template.bind({});
Square.args = {
	type: "square",
	alt: "Square Logo", // Provide alt text for accessibility
};

// Circular Logo
export const Circular = Template.bind({});
Circular.args = {
	type: "circular",
	alt: "Circular Logo", // Provide alt text for accessibility
};
