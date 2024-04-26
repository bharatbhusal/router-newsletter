import React, { Fragment, useState } from "react";
import { updateNewsById } from "../apis/newsAPIs";
import { useNewsContext } from "../context/newsContext";
import { useDateContext } from "../context/dateContext";
import { getNewsByDate } from "../apis/newsAPIs";
import env from "../utils/validateEnv";

const EditNews = ({ news }) => {
	const [newNews, setNewNews] = useState(news);
	const { setNewsOfGivenDate } = useNewsContext();
	const { date } = useDateContext();

	const changeNews = async (e) => {
		e.preventDefault();
		try {
			await updateNewsById(newNews.id, newNews);
			setNewsOfGivenDate(
				await getNewsByDate(
					date.year(),
					date.month() + 1,
					date.date()
				)
			);
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<Fragment>
			<button
				type="button"
				className="btn btn-warning"
				data-toggle="modal"
				data-target={`#idEdit${newNews.id}`}
			>
				Edit
			</button>

			{/* <!-- The Modal --> */}
			<div
				className="modal"
				id={`idEdit${newNews.id}`}
				onClick={() => setNewNews(newNews)}
			>
				<div className="modal-dialog">
					<div className="modal-content">
						{/* <!-- Modal Header --> */}
						<div className="modal-header">
							<h4 className="modal-title">Edit News</h4>
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
						<div className="modal-body">
							<form onSubmit={(e) => changeNews(e)}>
								<input
									type="text"
									className="form-control edit_news"
									value={newNews.headline}
									required
									onChange={(e) =>
										setNewNews((prev) => ({
											...prev,
											headline: e.target.value,
										}))
									}
								/>
								<textarea
									style={{ height: "10rem" }}
									type="text"
									className="form-control edit_news"
									value={newNews.summary}
									onChange={(e) =>
										setNewNews((prev) => ({
											...prev,
											summary: e.target.value,
										}))
									}
								/>
								<input
									type="text"
									className="form-control edit_news"
									value={newNews.source}
									required
									onChange={(e) =>
										setNewNews((prev) => ({
											...prev,
											source: e.target.value,
										}))
									}
								/>
							</form>
						</div>

						{/* <!-- Modal footer --> */}
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-warning"
								data-dismiss="modal"
								onClick={(e) => changeNews(e)}
							>
								Edit
							</button>

							<button
								type="button"
								className="btn btn-danger"
								data-dismiss="modal"
								onClick={() => setNewNews(newNews)}
							>
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default EditNews;
