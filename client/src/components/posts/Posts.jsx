import React, { useState } from "react";
import "./Posts.css";
import Post from "../post/Post";

const Posts = ({ posts }) => {
	return (
		<div className="Posts">
			{posts.length === 0 ? (
				<div className="noPostsFetching">No Posts Founds</div>
			) : (
				posts.map(
					(post, id) => post && <Post data={post} key={id} />
				)
			)}
		</div>
	);
};

export default Posts;
