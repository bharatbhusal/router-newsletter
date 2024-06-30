import React from "react";
import HomeTemplate from "./HomeTemplate";
import Header from "../../molecules/Header/Header";
import Footer from "../../molecules/Footer/Footer";
import CardList from "../../organisms/CardList/CardList";

export default {
	title: "Templates/HomeTemplate",
	component: HomeTemplate,
};

const Template = (args) => <HomeTemplate {...args} />;

export const Default = Template.bind({});
Default.args = {
	header: <Header />,
	mainContent: (
		<CardList
			cards={[
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
			]}
		/>
	),
	footer: <Footer />,
};
