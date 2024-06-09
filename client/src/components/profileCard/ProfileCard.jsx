import React, { useState } from "react";
import "./ProfileCard.css";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import ProfileModal from "../profileModal/ProfileModal";
import config from "../../../config";

const ProfileCard = ({ location }) => {
	const params = useParams();
	const [modalOpened, setModalOpened] = useState(false);
	const { user } = useSelector(
		(state) => state.authReducer.authData
	);
	const posts = useSelector(
		(state) => state.postReducer.posts
	);
	const serverPublic = config.VITE_APP_PUBLIC_FOLDER;
	const profileUserId = params.id;

	if (!user) {
		return null; // or a loading spinner, or any placeholder
	}

	return (
		<div className="ProfileCard">
			<div className="ProfileImages">
				<img
					src={
						user.cover_picture
							? `${serverPublic}${user.cover_picture}`
							: `${serverPublic}default_cover.png`
					}
					alt="Cover"
				/>
				<img
					src={
						user.profile_picture
							? `${serverPublic}${user.profile_picture}`
							: `${serverPublic}default_profile.png`
					}
					alt="Profile"
				/>
			</div>
			<div className="ProfileName">
				<span>
					{user.first_name} {user.last_name}
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
				{user.lives_in
					? `Lives in ${user.lives_in}`
					: "Lives in ..."}
			</div>
			<div className="userDetails">
				<hr />
				<div>
					<span>{user.works_at || "Works At"}</span>
					{location === "profilePage" && (
						<>
							<div className="vl"></div>
							<div className="follow">
								<span>
									{
										posts.filter((post) => post?.user_id === user._id)
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
