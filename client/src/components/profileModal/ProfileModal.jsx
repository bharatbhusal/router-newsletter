import React, { useState } from "react";
import "./ProfileModal.css";
import { Modal, useMantineTheme } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../actions/UserAction";

function ProfileModal({
	modalOpened,
	setModalOpened,
	data: initialUserData,
}) {
	const theme = useMantineTheme();
	const [userData, setUserData] = useState(initialUserData);
	const [profileImage, setProfileImage] = useState(null);
	const [coverImage, setCoverImage] = useState(null);
	const dispatch = useDispatch();
	const { user } = useSelector(
		(state) => state.authReducer.authData
	);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserData((prevUserData) => ({
			...prevUserData,
			[name]: value,
		}));
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		const name = e.target.name;
		if (name === "profileImage") {
			setProfileImage(file);
		} else if (name === "coverImage") {
			setCoverImage(file);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData();
		if (profileImage) {
			formData.append("profileImage", profileImage);
		}
		if (coverImage) {
			formData.append("coverImage", coverImage);
		}
		formData.append("firstName", userData.firstName.trim());
		formData.append("lastName", userData.lastName.trim());
		formData.append("worksAt", userData.worksAt);
		formData.append("livesIn", userData.livesIn);
		formData.append("country", userData.country);

		dispatch(updateUser(user._id, formData));
		setModalOpened(false);
	};

	return (
		<Modal
			opened={modalOpened}
			onClose={() => setModalOpened(false)}
			size="80%"
			overlayProps={{
				color:
					theme.colorScheme === "dark"
						? theme.colors.dark[9]
						: theme.colors.gray[2],
				opacity: 0.55,
				blur: 3,
			}}
		>
			<form className="infoForm" onSubmit={handleSubmit}>
				<h3>Update Your Info</h3>
				<div className="firstLastName">
					<input
						type="text"
						placeholder="First Name"
						className="infoInput"
						name="firstName"
						value={userData.firstName}
						onChange={handleChange}
						required
					/>
					<input
						type="text"
						placeholder="Last Name"
						className="infoInput"
						name="lastName"
						value={userData.lastName}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="worksAt">
					<input
						type="text"
						placeholder="Works At"
						className="infoInput"
						name="worksAt"
						value={userData.worksAt}
						onChange={handleChange}
					/>
				</div>
				<div className="address">
					<input
						type="text"
						placeholder="Lives in"
						className="infoInput"
						name="livesIn"
						value={userData.livesIn}
						onChange={handleChange}
					/>
					<input
						type="text"
						placeholder="Country"
						className="infoInput"
						name="country"
						value={userData.country}
						onChange={handleChange}
					/>
				</div>
				<div className="image">
					<div className="profileImage">
						<h5>Profile Image</h5>
						<input
							type="file"
							name="profileImage"
							onChange={handleImageChange}
						/>
					</div>
					<div className="coverImage">
						<h5>Cover Image</h5>
						<input
							type="file"
							name="coverImage"
							onChange={handleImageChange}
						/>
					</div>
				</div>
				<button className="button infoButton" type="submit">
					Update
				</button>
			</form>
		</Modal>
	);
}

export default ProfileModal;
