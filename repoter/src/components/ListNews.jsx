import React, {
	Fragment,
	useEffect,
	useState,
} from "react";
import EditNews from "./EditNews";
import env from "../utils/validateEnv";
import NewsDetail from "./NewsDetail";

const ListNews = ({ day }) => {
	const [newsData, setNewsData] = useState();

	//delete news function
	const deleteNews = async (id) => {
		try {
			await fetch(`${env.REACT_APP_SERVER_URL}/${id}`, {
				method: "DELETE",
			});
			setNewsData(newsData.filter((news) => news._id !== id));
		} catch (error) {
			console.log(error.message);
		}
	};

	const getNews = async () => {
		try {
			const response = await fetch(
				`${env.REACT_APP_SERVER_URL}/2024/4/${day}`
			);
			const jsonData = await response.json();
			setNewsData(jsonData);
		} catch (error) {
			console.log(error.message);
		}
	};
	useEffect(() => {
		// setTimeout(() => {
		getNews();
		// }, 3000);
	}, []);

	return (
		<Fragment>
			<h1 className="mt-5">List News</h1>
			<h7 style={{ fontStyle: "italic" }}>
				Tap on the summary for detail
			</h7>
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
					{newsData &&
						newsData.map((news) => (
							<tr key={news._id}>
								<td>{news.headline}</td>
								<td>
									<NewsDetail
										news={{
											id: news._id,
											headline: news.headline,
											source: news.source,
											summary: news.summary,
											date: news.updatedAt,
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
