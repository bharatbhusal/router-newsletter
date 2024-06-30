import React from "react";
import HomeTemplate from "../../templates/HomeTemplate/HomeTemplate";
import Header from "../../molecules/Header/Header";
import Footer from "../../molecules/Footer/Footer";
import CardList from "../../organisms/CardList/CardList";
import "./Home.css";

const Home = ({ cards }) => {
	const headerContent = <Header />;
	const footerContent = <Footer />;
	const mainContent = <CardList cards={cards} />; // Or any other content you want to display on the homepage

	return (
		<HomeTemplate
			header={headerContent}
			mainContent={mainContent}
			footer={footerContent}
		/>
	);
};

export default Home;
