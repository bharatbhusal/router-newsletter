// Text.stories.jsx

import React from "react";
import Text from "./Text";
import "../../../variables.css";

export default {
	title: "Components/Text", // Title of the story category in Storybook UI
	component: Text, // Component being documented
	argTypes: {
		variant: {
			control: {
				type: "select",
				options: ["body", "heading", "subtext"], // Options for text variant
			},
		},
	},
};

// Template for the text component
const Template = (args) => <Text {...args} />;

// Body Text
export const Body = Template.bind({});
Body.args = {
	variant: "body",
	children: "This is body text.",
};

// Heading Text
export const Heading = Template.bind({});
Heading.args = {
	variant: "heading",
	children: "This is a heading.",
};

// Subtext
export const Subtext = Template.bind({});
Subtext.args = {
	variant: "subtext",
	children: "This is subtext.",
};
