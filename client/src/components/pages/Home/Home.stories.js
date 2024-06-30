import React from "react";
import Home from "./Home";

export default {
	title: "Pages/Home",
	component: Home,
};

const Template = (args) => <Home {...args} />;

export const Default = Template.bind({});
Default.args = {
	cards: [
		{
			title: "Card 1",
			description: "This is the description for card 1.",
		},
		{
			title: "Card 2",
			description: "This is the description for card 2.",
		},
		{
			title: "Card 3",
			description: "This is the description for card 3.",
		},
		{
			title: "Card 4",
			description: "This is the description for card 4.",
		},
	],
};
