import React, { useEffect, useState } from "react";
import "./myPosts.css";
import Post from "../post/Post";
import { getMyPosts } from "../../api/PostRequest";

const MyPosts = () => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const fetchedPosts = await getMyPosts();
				setPosts(fetchedPosts);
			} catch (error) {
				console.error("Error fetching posts:", error);
			}
		};

		fetchPosts();
	}, []);

	return (
		<div className="myPosts">
			{posts.length === 0 ? (
				<div className="noPostsFetching">No Posts Found</div>
			) : (
				posts.map(
					(post, index) =>
						post && <Post data={post} key={index} />
				)
			)}
		</div>
	);
};

export default MyPosts;
