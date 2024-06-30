import React from "react";
import "./NavBar.css";

import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ShareModal from "../shareModal/ShareModal";
import { FaPencil } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import config from "../../../config.js";
import { useState } from "react";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { TiThMenu } from "react-icons/ti";

const NavBar = () => {
	const location = useLocation();
	const user = useSelector(
		(state) => state.authReducer?.authData?.user
	);
	const [modalOpened, setModalOpened] = useState(false);
	const serverPublic = config.VITE_APP_PUBLIC_FOLDER;

	const handleLogOut = () => {
		localStorage.clear();
		window.location.href = "/auth";
	};

	return (
		<>
			{user && (
				<div className="navBar">
					<div className="navIcons">
						<Link to="/history" className="addNews">
							<TiThMenu size={30} />
						</Link>
						{user.is_admin && (
							<>
								{location.pathname.includes("profile") ? (
									<Link to="../posts">
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
													? serverPublic +
													  "profile/" +
													  user.profile_picture
													: serverPublic +
													  "profile/" +
													  "default_profile.png"
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
							</>
						)}
						<button className="addNews" onClick={handleLogOut}>
							<RiLogoutCircleRLine size={30} />
						</button>
					</div>
				</div>
			)}
		</>
	);
};

export default NavBar;
