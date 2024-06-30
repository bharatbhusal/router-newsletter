// Card.stories.jsx

import React from "react";
import Card from "./Card";

export default {
	title: "Components/molecules/Card",
	component: Card,
};

const Template = (args) => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {
	title: "Sample Card Title",
	description:
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis libero eget justo vehicula, id ullamcorper nisi gravida.",
};
