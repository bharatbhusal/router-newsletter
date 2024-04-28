import React from "react";
import NewsDetail from "./NewsDetail";
import Button from "@mui/material/Button";
import EditNews from "./EditNews";
import DeleteNews from "./DeleteNews";
import { AiOutlineDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";

const NewsItem = ({ news, isLoggedIn }) => {
	const editDeleteNews = {
		id: news._id,
		headline: news.headline,
		source: news.source,
		summary: news.summary,
		reporter: news.reporter,
		date: news.date,
	};
	return (
		<div className="rows">
			<h6
				style={{ width: "100%" }}
				data-toggle="modal"
				data-target={`#idDetail${news._id}`}
			>
				{news.headline}
			</h6>
			<h6
				style={{ width: "100%" }}
				data-toggle="modal"
				data-target={`#idDetail${news._id}`}
			>
				{news.summary.length >= 80
					? `${news.summary.slice(0, 100)}......`
					: news.summary}
			</h6>
			<NewsDetail news={editDeleteNews} />
			{isLoggedIn &&
				news.reporter ===
					JSON.parse(localStorage.getItem("user")).email && (
					<div className="buttons">
						<button
							className="edit-btn"
							type="button"
							data-toggle="modal"
							data-target={`#idEdit${news._id}`}
						>
							<FaEdit />
						</button>
						<EditNews news={editDeleteNews} />

						<button
							className="delete-btn"
							data-toggle="modal"
							data-target={`#idDelete${news._id}`}
						>
							<AiOutlineDelete />
						</button>
						<DeleteNews news={editDeleteNews} />
					</div>
				)}
		</div>
	);
};

export default NewsItem;
