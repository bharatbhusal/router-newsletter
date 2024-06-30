import React, { useEffect, useState } from "react";
import "./myPosts.css";
import Post from "../post/Post";
import { getMyPosts } from "../../api/PostRequest";

const MyPosts = () => {
	const [posts, setPosts] = useState([]);
	const [postEdited, setPostEdited] = useState(false);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				console.log("Fetching posts");
				const fetchedPosts = await getMyPosts();
				setPosts(fetchedPosts);
			} catch (error) {
				console.error("Error fetching posts:", error);
			}
		};

		fetchPosts();
	}, [postEdited]);

	const handlePostEdited = () => {
		setPostEdited((prev) => !prev); // Toggle the state to trigger re-fetch
	};

	return (
		<div className="myPosts">
			{posts.length === 0 ? (
				<div className="noPostsFetching">No Posts Found</div>
			) : (
				posts.map(
					(post, index) =>
						post && (
							<Post
								data={post}
								key={index}
								onPostEdited={handlePostEdited}
							/>
						)
				)
			)}
		</div>
	);
};

export default MyPosts;
