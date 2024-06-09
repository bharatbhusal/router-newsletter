import React, { useState, useEffect } from "react";
import "./ProfileModal.css";
import { Modal, useMantineTheme } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../actions/AuthAction";

function ProfileModal({
	modalOpened,
	setModalOpened,
	data: initialUserData,
}) {
	const theme = useMantineTheme();
	const [userData, setUserData] = useState({});
	const [profilePicture, setProfilePicture] = useState(null);
	const [coverPicture, setCoverPicture] = useState(null);
	const dispatch = useDispatch();
	const { user } = useSelector(
		(state) => state.authReducer.authData
	);

	useEffect(() => {
		if (initialUserData) {
			setUserData(initialUserData);
		}
	}, [initialUserData]);

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
		if (name === "profile_picture") {
			setProfilePicture(file);
		} else if (name === "cover_picture") {
			setCoverPicture(file);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData();
		if (profilePicture) {
			formData.append("profile_picture", profilePicture);
		}
		if (coverPicture) {
			formData.append("cover_picture", coverPicture);
		}
		formData.append(
			"first_name",
			userData.first_name?.trim()
		);
		formData.append("last_name", userData.last_name?.trim());
		formData.append("works_at", userData.works_at?.trim());
		formData.append("lives_in", userData.lives_in?.trim());

		dispatch(updateUser(formData));
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
						name="first_name"
						value={userData.first_name || ""}
						onChange={handleChange}
						required
					/>
					<input
						type="text"
						placeholder="Last Name"
						className="infoInput"
						name="last_name"
						value={userData.last_name || ""}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="works_at">
					<input
						type="text"
						placeholder="Works At"
						className="infoInput"
						name="works_at"
						value={userData.works_at || ""}
						onChange={handleChange}
					/>
				</div>
				<div className="address">
					<input
						type="text"
						placeholder="Lives in"
						className="infoInput"
						name="lives_in"
						value={userData.lives_in || ""}
						onChange={handleChange}
					/>
				</div>
				<div className="image">
					<div className="profilePicture">
						<h5>Profile Image</h5>
						<input
							type="file"
							name="profile_picture"
							onChange={handleImageChange}
						/>
					</div>
					<div className="coverPicture">
						<h5>Cover Image</h5>
						<input
							type="file"
							name="cover_picture"
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
