import React, { Fragment, useState } from "react";
import { useNewsContext } from "../context/newsContext";
import { useDateContext } from "../context/dateContext";
import Button from "@mui/material/Button";

import { deleteNewsById } from "../apis/newsAPIs";

const DeleteNews = ({ news }) => {
	var hostname = "";
	try {
		if (news && news.source) {
			const sourceUrl = new URL(news.source);
			hostname = sourceUrl.hostname;
		} else {
			throw new Error(
				"News or news source is undefined or null"
			);
		}
	} catch (error) {
		console.error(
			"Error occurred while parsing source URL:",
			error.message
		);
	}
	const [newNews, setNewNews] = useState(news);
	const { newsOfGivenDate, setNewsOfGivenDate } =
		useNewsContext();
	const { date } = useDateContext();

	const deleteNews = async (id) => {
		try {
			const res = await deleteNewsById(id);

			if (res) {
				setNewsOfGivenDate(
					newsOfGivenDate.filter((news) => news._id !== id)
				);
			}
		} catch (error) {
			console.error(error.message);
		}
	};

	return (
		<div className="delete-news">
			{/* <!-- The Modal --> */}
			<div
				className="modal fade"
				id={`idDelete${newNews.id}`}
				onClick={() => setNewNews(newNews)}
				style={{
					zIndex: "10000",
				}}
			>
				<div className="modal-dialog modal-dialog-centered">
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
							{hostname && (
								<>
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
								</>
							)}
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
								<Button
									type="button"
									variant="contained"
									color="error"
									data-dismiss="modal"
									onClick={() => deleteNews(news.id)}
								>
									Yes
								</Button>

								<Button
									type="button"
									variant="contained"
									color="success"
									data-dismiss="modal"
									onClick={() => setNewNews(newNews)}
								>
									No
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DeleteNews;
