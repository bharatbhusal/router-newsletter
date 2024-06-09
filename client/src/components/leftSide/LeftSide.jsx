import React, { useState } from "react";
import "./LeftSide.css";
import Contributors from "../contributors/Contributors";
import CompanyProfileCard from "../companyProfileCard/CompanyProfileCard";
import Home from "../../Img/home.png";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ShareModal from "../shareModal/ShareModal";
import { FaPencil } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import config from "../../../config";

import NewsHistory from "../newsHistory/NewsHistory";

const LeftSide = () => {
	const location = useLocation();
	const { user } = useSelector(
		(state) => state.authReducer.authData
	);

	const [modalOpened, setModalOpened] = useState(false);
	const serverPublic = config.VITE_APP_PUBLIC_FOLDER;
	return (
		<div className="LeftSide">
			<div className="navIcons">
				{location.pathname.includes("profile") ? (
					<Link to="../home">
						<div>
							<FaHome size={30} />
						</div>
					</Link>
				) : (
					<Link to={`/profile/${user._id}`}>
						<img
							className="profile-picture"
							src={
								user.profile_picture
									? serverPublic + "profile/" + user.profile_picture
									: serverPublic + "profile/" + "default_profile.png"
							}
							alt=""
						/>
					</Link>
				)}

				<div
					className="addNews"
					onClick={() => setModalOpened(true)}
				>
					<FaPencil size={30} />
				</div>
				<ShareModal
					modalOpened={modalOpened}
					setModalOpened={setModalOpened}
				/>
			</div>
			<CompanyProfileCard location="homepage" />
			<NewsHistory />
			<Contributors />
		</div>
	);
};

export default LeftSide;
