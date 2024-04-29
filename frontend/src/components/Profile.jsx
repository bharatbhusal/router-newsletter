import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you are using React Router for routing
import { updateUserById } from "../apis/usersAPIs";
import { getNewsByUser } from "../apis/newsAPIs";
import Button from "@mui/material/Button";
import { FaEdit } from "react-icons/fa";
import TextField from "@mui/material/TextField";
import { useUserContext } from "../context/userContext";
import DataTable, {
	CustomPaginationActionsTable,
} from "./UserNewsTable";

const Profile = () => {
	const navigate = useNavigate();
	const {
		user,
		setUser,
		newsByGivenUser,
		setNewsByGivenUser,
	} = useUserContext();

	useEffect(() => {
		if (!user) navigate("/login");
	});
	const [newUser, setNewUser] = useState(user);

	const onSubmitUpdate = async (e) => {
		try {
			e.preventDefault();
			await updateUserById(newUser.id, newUser);
			setUser(newUser);
			localStorage.setItem("user", JSON.stringify(newUser));
		} catch (error) {
			console.error("Failed to update user:", error);
		}
	};

	useEffect(() => {
		const getUserNews = async () => {
			try {
				const response = await getNewsByUser(user.email);

				setNewsByGivenUser(response.reverse());
			} catch (error) {
				console.error("Failed to get news by user:", error);
			}
		};
		getUserNews();
		console.log(newsByGivenUser);
	}, []);
	return (
		user && (
			<div className="user-profile">
				<h1>Hi {user.firstName}!!</h1>
				<p>Email: {user.email}</p>

				<Button
					data-toggle="modal"
					data-target={`#idEdit${user.id}`}
					type="button"
					variant="contained"
					color="warning"
					data-dismiss="modal"
					className="edit-btn"
				>
					Update Profile
				</Button>

				<div
					className="modal fade"
					id={`idEdit${user.id}`}
					onClick={() => setNewUser(newUser)}
					style={{
						zIndex: "10000",
					}}
				>
					<div className="modal-dialog modal-dialog-centered">
						<div className="modal-content">
							{/* <!-- Modal Header --> */}
							<div className="modal-header">
								<h4
									className="modal-title"
									style={{
										color: "#bb2765",
										fontWeight: "bold",
										fontSize: "2rem",
									}}
								>
									Edit User Details
								</h4>
								<button
									type="button"
									className="close"
									data-dismiss="modal"
									onClick={() => setNewUser(newUser)}
								>
									&times;
								</button>
							</div>

							{/* <!-- Modal body --> */}
							<div className="modal-body">
								<form onSubmit={(e) => onSubmitUpdate(e)}>
									<TextField
										margin="normal"
										required
										fullWidth
										id="firstName"
										label="First Name"
										name="fname"
										value={newUser.firstName}
										onChange={(e) =>
											setNewUser((prev) => ({
												...prev,
												firstName: e.target.value,
											}))
										}
									/>
									<TextField
										margin="normal"
										required
										fullWidth
										id="lastName"
										label="Last Name"
										name="lname"
										value={newUser.lastName}
										onChange={(e) =>
											setNewUser((prev) => ({
												...prev,
												lastName: e.target.value,
											}))
										}
									/>
								</form>
							</div>

							{/* <!-- Modal footer --> */}
							<div className="modal-footer">
								<div className="yes-no">
									<Button
										type="button"
										variant="contained"
										color="warning"
										data-dismiss="modal"
										onClick={onSubmitUpdate}
									>
										Edit
									</Button>

									<Button
										type="button"
										variant="contained"
										color="error"
										data-dismiss="modal"
										onClick={() => setNewUser(newUser)}
									>
										Close
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="news-reported">
					<h4 style={{ marginTop: "1rem" }}>News</h4>
					<h6 style={{ fontStyle: "italic" }}>
						You have {newsByGivenUser.length} news reported so
						far.
					</h6>
					{newsByGivenUser &&
						newsByGivenUser.length !== 0 &&
						newsByGivenUser[0]._id && (
							<DataTable rows={newsByGivenUser} />
						)}
				</div>
			</div>
		)
	);
};

export default Profile;
