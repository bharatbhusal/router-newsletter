import React, { useState } from "react";
import "./ProfileCard.css";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import ProfileModal from "../profileModal/ProfileModal";

const ProfileCard = ({ location }) => {
	const params = useParams();
	const [modalOpened, setModalOpened] = useState(false);
	const { user } = useSelector(
		(state) => state.authReducer.authData
	);
	const profileUserId = params.id;
	const posts = useSelector(
		(state) => state.postReducer.posts
	);
	const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

	return (
		<div className="ProfileCard">
			<div className="ProfileImages">
				<img
					src={
						user.coverPicture
							? serverPublic + user.coverPicture
							: serverPublic + "defaultCover.jpg"
					}
					alt=""
				/>
				<img
					src={
						user.profilePicture
							? serverPublic + user.profilePicture
							: serverPublic + "defaultProfile.png"
					}
					alt=""
				/>
			</div>
			<div className="ProfileName">
				<span>
					{user.firstName} {user.lastName}
				</span>
				{user._id === profileUserId && (
					<div>
						<EditIcon
							width="2rem"
							height="1.2rem"
							onClick={() => setModalOpened(true)}
						/>

						<ProfileModal
							modalOpened={modalOpened}
							setModalOpened={setModalOpened}
							data={user}
						/>
					</div>
				)}
			</div>
			<div className="details">
				{user.worksAt ? user.livesIn : "Lives in ..."}
			</div>
			<div className="userDetails">
				<hr />
				<div>
					<span>{user.worksAt || "Works At"}</span>
					{location === "profilePage" && (
						<>
							<div className="vl"></div>
							<div className="follow">
								<span>
									{
										posts.filter((post) => post?.userId === user._id)
											.length
									}
								</span>
								<span>Posts</span>
							</div>
						</>
					)}
				</div>
				<hr />
			</div>
		</div>
	);
};

export default ProfileCard;
