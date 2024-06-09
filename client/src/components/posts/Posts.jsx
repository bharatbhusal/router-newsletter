import React, { useEffect } from "react";
import "./Posts.css";
import Post from "../post/Post";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getThisMonthPosts } from "../../actions/PostAction";

const Posts = () => {
	const dispatch = useDispatch();
	let { posts, loading } = useSelector(
		(state) => state.postReducer
	);

	useEffect(() => {
		dispatch(getThisMonthPosts());
	}, []);

	return (
		<div className="Posts">
			{posts.length === 0 ? (
				<div className="noPostsFetching">No Posts Founds</div>
			) : loading ? (
				<div className="noPostsFetching">Fetching Posts...</div>
			) : (
				posts.map(
					(post, id) => post && <Post data={post} key={id} />
				)
			)}
		</div>
	);
};

export default Posts;
