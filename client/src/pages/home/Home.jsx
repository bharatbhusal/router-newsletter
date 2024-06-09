import React from "react";
import "./Home.css";
import LeftSide from "../../components/leftSide/LeftSide";
import Posts from "../../components/posts/Posts";
import NavBar from "../../components/navBar/NavBar";

const Home = () => {
	return (
		<>
			<NavBar />
			<div className="Home">
				<LeftSide />
				<Posts />
			</div>
		</>
	);
};

export default Home;
