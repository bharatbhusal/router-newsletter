import React, { useEffect, useState } from "react";
import "./CompanyProfileCard.css";
import CompanyLogo from "../../Img/companyLogo.PNG";
import CompanyCover from "../../Img/companyCover.png";
import { useSelector } from "react-redux";
import { countAllPosts } from "../../api/PostRequest";
import { countAdmins } from "../../api/UserRequest";

const CompanyProfileCard = () => {
	const { posts } = useSelector(
		(state) => state.postReducer
	);
	const [allPostCount, setAllPostCount] = useState();
	const [contributors, setContributors] = useState();
	useEffect(() => {
		const fetchAllPostsCount = async () => {
			const postsCounts = await countAllPosts();
			setAllPostCount(postsCounts);
			const adminsCounts = await countAdmins();
			setContributors(adminsCounts);
		};
		fetchAllPostsCount();
	}, [posts]);
	return (
		<div className="company-profile-card">
			<div className="company-images">
				<img
					src={CompanyCover}
					alt="Company Cover"
					className="cover-image"
				/>
				<img
					src={CompanyLogo}
					alt="Company Logo"
					className="logo-image"
				/>
			</div>

			<div className="company-name">
				<span>Router Protocol</span>
				<span>
					Onboarding the next billion users to Web3 by destroying
					blockchain segregation
				</span>
			</div>

			<div className="status">
				<hr />
				<div className="status-details">
					<div className="news">
						<span>{allPostCount}</span>
						<span>News</span>
					</div>
					<div className="vl"></div>
					<div className="contributors">
						<span>{contributors}</span>
						<span>Contributors</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CompanyProfileCard;
