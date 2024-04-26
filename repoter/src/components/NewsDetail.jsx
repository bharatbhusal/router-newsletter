import React, { Fragment } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useDateContext } from "../context/dateContext";

const NewsDetail = ({ news }) => {
	const sourceUrl = new URL(news.source);
	const hostname = sourceUrl.hostname;
	const { date } = useDateContext();
	return (
		<Fragment>
			<span
				style={{
					minWidth: "10rem",
					minHeight: "2rem",
					display: "inline-block",
					cursor: "pointer",
					wordWrap: "break-word",
				}}
				data-toggle="modal"
				data-target={`#idDetail${news.id}`}
			>
				{news.summary.length >= 80
					? `${news.summary.slice(0, 100)}......`
					: news.summary}
			</span>

			{/* <!-- The Modal --> */}
			<div className="modal" id={`idDetail${news.id}`}>
				<div className="modal-dialog">
					<div className="modal-content">
						{/* <!-- Modal Header --> */}
						<div className="modal-header">
							<h4 className="modal-title">News Detail</h4>
							<button
								type="button"
								className="close"
								data-dismiss="modal"
							>
								&times;
							</button>
						</div>

						<div className="modal-body news_detail">
							<div className="headline">{news.headline}</div>
							<div
								className="summary"
								style={{ wordWrap: "break-word" }}
							>
								{news.summary}
							</div>
							<div className="source">
								{hostname}
								<a
									href={news.source}
									target="_blank"
									rel="noreferrer"
								>
									&nbsp;
									<FaExternalLinkAlt />
								</a>
							</div>
						</div>
						{/* <!-- Modal footer -->} */}
						<div className="modal-footer news_details_footer">
							{date.format("MMMM")} {date.date()}, {date.year()} |{" "}
							{date.format("dddd")}
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default NewsDetail;
