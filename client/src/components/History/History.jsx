import React from "react";
import "./History.css";
import Contributors from "../contributors/Contributors";
import CompanyProfileCard from "../companyProfileCard/CompanyProfileCard";

import NewsHistory from "../newsHistory/NewsHistory";

const History = () => {
	return (
		<div className="History">
			<CompanyProfileCard location="homepage" />
			<NewsHistory />
			<Contributors />
		</div>
	);
};

export default History;
