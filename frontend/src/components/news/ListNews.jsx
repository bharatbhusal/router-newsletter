import React, { Fragment, useEffect } from "react";
import { getNewsByDate } from "../../apis/newsAPIs";
import NewsItem from "./NewsItem";
import Calendar from "../utils/Calendar";
import { useDateContext } from "../../context/dateContext";
import { useNewsContext } from "../../context/newsContext";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
	generateTextContent,
	copyToClipboard,
} from "../../utils/downloader";

const ListNews = () => {
	const { date } = useDateContext();

	const { newsOfGivenDate, setNewsOfGivenDate } =
		useNewsContext();

	const isLoggedIn = localStorage.getItem("user-jwt-token")
		? true
		: false;

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
			<div className="list-news-table">
				<div className="title">
					<h5 style={{ width: "100%" }}>Headline</h5>
					<h5 style={{ width: "100%" }}>Summary</h5>
				</div>

				{newsOfGivenDate.length !== 0 ? (
					newsOfGivenDate
						.reverse()
						.map((news) => (
							<NewsItem
								key={news._id}
								news={news}
								isLoggedIn={isLoggedIn}
							/>
						))
				) : (
					<div className="rows no-news">
						<h6>No news available</h6>
					</div>
				)}
			</div>
		</Fragment>
	);
};

export default ListNews;
