import React, { Fragment, useState } from "react";
import { updateNewsById } from "../apis/newsAPIs";
import { useNewsContext } from "../context/newsContext";
import { useDateContext } from "../context/dateContext";
// import { getNewsByDate } from "../apis/newsAPIs";

import {
	getNewsByDate,
	deleteNewsById,
} from "../apis/newsAPIs";

const DeleteNews = ({ news }) => {
	const sourceUrl = new URL(news.source);
	const hostname = sourceUrl.hostname;
	const [newNews, setNewNews] = useState(news);
	const { newsOfGivenDate, setNewsOfGivenDate } =
		useNewsContext();
	const { date } = useDateContext();

	const deleteNews = async (id) => {
		try {
			await deleteNewsById(id);

			setNewsOfGivenDate(
				newsOfGivenDate.filter((news) => news._id !== id)
			);
		} catch (error) {
			console.error(error.message);
		}
	};

	return (
		<Fragment>
			<button
				className="btn btn-danger"
				type="button"
				data-toggle="modal"
				data-target={`#idDelete${newNews.id}`}
			>
				Delete
			</button>

			{/* <!-- The Modal --> */}
			<div
				className="modal"
				id={`idDelete${newNews.id}`}
				onClick={() => setNewNews(newNews)}
			>
				<div className="modal-dialog">
					<div className="modal-content">
						{/* <!-- Modal Header --> */}
						<div className="modal-header">
							<h4
								className="modal-title"
								style={{
									color: "#bb2765",
									fontWeight: "bold",
									fontSize: "2rem",
								}}
							>
								Delete News
							</h4>
							<button
								type="button"
								className="close"
								data-dismiss="modal"
								onClick={() => setNewNews(newNews)}
							>
								&times;
							</button>
						</div>

						{/* <!-- Modal body --> */}
						<div className="modal-body news_detail">
							<div className="headline">{news.headline}</div>
							<div
								className="summary"
								style={{ wordWrap: "break-word" }}
							>
								{news.summary}
							</div>
							<span style={{ fontWeight: "bold" }}>
								Source: &nbsp;
							</span>
							<a
								href={news.source}
								target="_blank"
								rel="noreferrer"
							>
								<div
									className="source"
									style={{ display: "inline" }}
								>
									{hostname}
								</div>
							</a>
						</div>

						{/* <!-- Modal footer --> */}
						<div className="modal-footer">
							<h5
								style={{
									fontWeight: "bold",
									fontSize: "1.2rem",
								}}
							>
								Are you sure to delete the news?
							</h5>
							<div className="yes-no">
								<button
									type="button"
									className="btn btn-danger"
									data-dismiss="modal"
									onClick={() => deleteNews(news.id)}
								>
									Yes
								</button>

								<button
									type="button"
									className="btn btn-primary"
									data-dismiss="modal"
									onClick={() => setNewNews(newNews)}
								>
									No
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default DeleteNews;
