import React, { useEffect, useState } from "react";
import "./Home.css";
import LeftSide from "../../components/leftSide/LeftSide";
import Posts from "../../components/posts/Posts";
import { getThisMonthPosts } from "../../api/PostRequest";

const Home = () => {
	const [posts, setPosts] = useState([]);
	useEffect(() => {
		setPosts(getThisMonthPosts());
	}, []);
	console.log(posts);
	return (
		<>
			<div className="Home">
				<LeftSide />
				<Posts posts={posts} />
			</div>
		</>
	);
};

export default Home;
