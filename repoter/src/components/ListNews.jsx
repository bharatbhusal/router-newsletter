import React, { Fragment, useEffect } from "react";
import EditNews from "./EditNews";
import {
	getNewsByDate,
	deleteNewsById,
} from "../apis/newsAPIs";
import NewsDetail from "./NewsDetail";
import Calendar from "./Calendar";
import { useDateContext } from "../context/dateContext";
import { useNewsContext } from "../context/newsContext";
import { useNavigate } from "react-router-dom";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
	generateTextContent,
	copyToClipboard,
} from "../utils/downloader";

const ListNews = () => {
	const { date } = useDateContext();
	const navigate = useNavigate();
	const { newsOfGivenDate, setNewsOfGivenDate } =
		useNewsContext();

	const handleLogout = () => {
		localStorage.removeItem("user-jwt-token");
		localStorage.removeItem("user");

		window.location.reload();
	};
	const handleLogIn = () => {
		navigate("/login");
	};

	const deleteNews = async (id) => {
		try {
			await deleteNewsById(id);
			setNewsOfGivenDate(
				newsOfGivenDate.filter((news) => news._id !== id)
			);
		} catch (error) {
			console.log(error.message);
		}
	};
	const handleCopyToClipboard = async () => {
		await copyToClipboard(
			generateTextContent(
				newsOfGivenDate,
				date.format("MMMM"),
				date.date(),
				date.format("dddd")
			)
		);
	};

	useEffect(() => {
		const getNews = async () => {
			try {
				const jsonData = await getNewsByDate(
					date.year(),
					date.month() + 1,
					date.date()
				);
				setNewsOfGivenDate(jsonData);
			} catch (error) {
				console.log(error.message);
			}
		};
		getNews();
	}, [date]);

	return (
		<Fragment>
			<div className="list-header">
				<div className="titles">
					<h2
						className="mt-3"
						style={{ fontWeight: "bold", maxWidth: "842px" }}
					>
						List News
					</h2>
					<h6 style={{ fontStyle: "italic", maxWidth: "842px" }}>
						Tap on the headline or summary for detail
					</h6>
				</div>
				{localStorage.getItem("user-jwt-token") ? (
					<button
						className="btn btn-danger"
						onClick={handleLogout}
					>
						Log out!!
					</button>
				) : (
					<button
						className="btn btn-success"
						onClick={handleLogIn}
					>
						Add news?
					</button>
				)}
			</div>
			<div className="tools">
				<Calendar />
				<div
					className="download"
					onClick={handleCopyToClipboard}
				>
					<ContentCopyIcon />
				</div>
			</div>
			<table
				className="table mt-5 text-center"
				style={{ maxWidth: "842px" }}
			>
				<thead>
					<tr>
						<th>Headline</th>
						<th>Summary</th>
						{localStorage.getItem("user-jwt-token") ? (
							<>
								<th>Edit</th>
								<th>Delete</th>
							</>
						) : (
							<></>
						)}
					</tr>
				</thead>

				<tbody>
					{newsOfGivenDate.length !== 0 ? (
						newsOfGivenDate.map((news) => (
							<tr key={news._id}>
								<td>
									<span
										style={{
											minHeight: "50px",
											display: "inline-block",
											cursor: "pointer",
											wordWrap: "break-word",
										}}
										data-toggle="modal"
										data-target={`#idDetail${news._id}`}
									>
										{news.headline}
									</span>
								</td>
								<td>
									<NewsDetail
										news={{
											id: news._id,
											headline: news.headline,
											source: news.source,
											summary: news.summary,
											date: news.date,
										}}
									/>
								</td>
								{localStorage.getItem("user-jwt-token") ? (
									<>
										<td>
											<EditNews
												news={{
													id: news._id,
													headline: news.headline,
													source: news.source,
													summary: news.summary,
												}}
											/>
										</td>
										<td>
											<button
												className="btn btn-danger"
												onClick={() => deleteNews(news._id)}
											>
												Delete
											</button>
										</td>
									</>
								) : (
									<></>
								)}
							</tr>
						))
					) : (
						<tr>
							<td colSpan="4">No news available</td>
						</tr>
					)}
				</tbody>
			</table>
		</Fragment>
	);
};

export default ListNews;
