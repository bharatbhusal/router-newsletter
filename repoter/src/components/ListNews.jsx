import React, {
	Fragment,
	useEffect,
	useState,
} from "react";
import EditNews from "./EditNews";
import {
	getNewsByDate,
	deleteNewsById,
} from "../apis/newsAPIs";
import NewsDetail from "./NewsDetail";
import Calendar from "./Calendar";
import { useDateContext } from "../context/dateContext";
import { useNewsContext } from "../context/newsContext";

const ListNews = () => {
	const { date } = useDateContext();
	const { newsOfGivenDate, setNewsOfGivenDate } =
		useNewsContext();

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
			<h1 className="mt-5">List News</h1>
			<h6 style={{ fontStyle: "italic" }}>
				Tap on the summary for detail
			</h6>
			<Calendar />
			<table className="table mt-5 text-center">
				<thead>
					<tr>
						<th>Headline</th>
						<th>Summary</th>
						<th>Edit</th>
						<th>Delete</th>
					</tr>
				</thead>

				<tbody>
					{newsOfGivenDate &&
						newsOfGivenDate.map((news) => (
							<tr key={news._id}>
								<td>{news.headline}</td>
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
							</tr>
						))}
				</tbody>
			</table>
		</Fragment>
	);
};

export default ListNews;
