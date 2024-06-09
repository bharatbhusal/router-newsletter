import React, { useEffect, useRef } from "react";
import "./PostShare.css";
import { useDispatch, useSelector } from "react-redux";
import { uploadPost } from "../../actions/PostAction";
import { getThisMonthPosts } from "../../actions/PostAction";

const PostShare = ({ setModalOpened }) => {
	const loading = useSelector(
		(state) => state.postReducer.uploading
	);

	const dispatch = useDispatch();

	const headline = useRef();
	const summary = useRef();
	const source = useRef();
	const { user } = useSelector(
		(state) => state.authReducer.authData
	);
	const reset = () => {
		headline.current.value = "";
		source.current.value = "";
		summary.current.value = "";
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const newPost = {
			user_id: user._id,
			headline: headline.current.value,
			summary: summary.current.value,
			source: source.current.value,
		};
		await dispatch(uploadPost(newPost));
		dispatch(getThisMonthPosts());
		reset();
		setModalOpened(false);
	};

	return (
		<form className="PostShare" onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Headline"
				required
				ref={headline}
			/>
			<input
				type="text"
				placeholder="Source"
				required
				ref={source}
			/>
			<textarea
				type="text"
				placeholder="Summary"
				// required
				ref={summary}
			/>

			<button
				className="button addNews"
				type="submit"
				// onClick={handleSubmit}
				disabled={loading}
			>
				{loading ? "uploading..." : "Share"}
			</button>
		</form>
	);
};

export default PostShare;
