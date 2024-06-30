// CardList.stories.jsx
import React from "react";
import CardList from "./CardList";

export default {
	title: "Components/Organisms/CardList",
	component: CardList,
};

const Template = (args) => <CardList {...args} />;

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
