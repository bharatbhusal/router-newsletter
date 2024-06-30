import React, { useState, useRef, useEffect } from "react";
import "./Post.css";
import Share from "../../Img/share.png";
import { FaPencil } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import { Modal, useMantineTheme } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import {
	updatePost,
	deletePost,
	getThisMonthPosts,
} from "../../actions/PostAction";
import { getMyPosts } from "../../api/PostRequest";

const Post = ({ data, onPostEdited }) => {
	const headline = useRef();
	const summary = useRef();
	const source = useRef();
	const dispatch = useDispatch();
	const { uploading } = useSelector(
		(state) => state.postReducer
	);

	const { user } = useSelector(
		(state) => state.authReducer.authData
	);
	const [modalOpened, setModalOpened] = useState(false);

	const handleDelete = async () => {
		await dispatch(deletePost(data._id, user._id));
		dispatch(getThisMonthPosts());
	};

	const handleEdit = () => {
		setModalOpened(true);
	};

	const reset = () => {
		headline.current.value = "";
		source.current.value = "";
		summary.current.value = "";
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const newPost = {
			userId: user._id,
			headline: headline.current.value,
			summary: summary.current.value,
			source: source.current.value,
		};
		await dispatch(updatePost(data._id, newPost));
		dispatch(getMyPosts());
		reset();
		onPostEdited(true);
		setModalOpened(false);
	};

	return (
		<div className="Post">
			<Modal
				opened={modalOpened}
				onClose={() => setModalOpened(false)}
				closeButtonProps={{
					color: "pink",
				}}
				centered
				ml="-5%"
				overlayProps={{
					opacity: 0.55,
					blur: 3,
				}}
				title={<div className="modalTitle">Edit News</div>}
			>
				<form className="PostShare" onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder="Headline"
						required
						defaultValue={data.headline}
						ref={headline}
					/>
					<input
						type="text"
						placeholder="Source"
						required
						defaultValue={data.source}
						ref={source}
					/>
					<textarea
						type="text"
						placeholder="Summary"
						required
						defaultValue={data.summary}
						ref={summary}
					/>

					<button
						className="button addNews"
						type="submit"
						disabled={uploading}
					>
						{uploading ? "uploading..." : "Edit"}
					</button>
				</form>
			</Modal>
			{user._id === data.posted_by && (
				<div className="action-btn">
					<div className="edit" onClick={handleEdit}>
						<FaPencil />
					</div>
					<div className="delete" onClick={handleDelete}>
						<MdDeleteOutline />
					</div>
				</div>
			)}
			<div className="detail">
				<b>{data.headline}</b>
				<br />
				<span>{data.summary}</span>
			</div>
			<a href={data.source} target="_blank">
				<img src={Share} alt="" />
			</a>
			<span style={{ color: "var(--gray)", fontSize: "14px" }}>
				{data.createdAt}
			</span>
		</div>
	);
};

export default Post;
