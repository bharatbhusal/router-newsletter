import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
	createTheme,
	ThemeProvider,
} from "@mui/material/styles";
import { signup, login } from "../apis/authAPIs";
import { useUserContext } from "../context/userContext";

import { toast } from "react-toastify";
import { InputLabel } from "@mui/material";

function LogIn() {
	const { user, setUser } = useUserContext();
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		try {
			event.preventDefault();
			const data = new FormData(event.currentTarget);
			const user = {
				email: data.get("email"),
				password: data.get("password"),
			};
			if (!user.email) {
				toast.error("Email is required");
				return;
			} else if (!user.password) {
				toast.error("Password is required");
				return;
			}
			const detail = await login(user);
			if (detail) {
				localStorage.setItem("user-jwt-token", detail.token);
				localStorage.setItem(
					"user",
					JSON.stringify(detail.user)
				);
				setUser(detail.user);
				navigate(-1);
			}
		} catch (error) {
			console.error(error.message);
			toast.error(error.message);
			// Handle the error here
		}
	};

	return (
		<ThemeProvider theme={createTheme()}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Log in
					</Typography>
					<Box
						component="form"
						onSubmit={handleSubmit}
						noValidate
						sx={{ mt: 1 }}
					>
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
						/>

						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Log In
						</Button>
						<Grid container>
							<Grid item xs>
								<NavLink
									style={{
										fontSize: ".8rem",
										fontStyle: "underline",
									}}
									to="/reset"
								>
									Forgot password?
								</NavLink>
							</Grid>
							<Grid item xs>
								<NavLink
									style={{
										fontSize: ".8rem",
									}}
									to="/signup"
								>
									{"Don't have an account? Sign Up"}
								</NavLink>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}
function SignUp() {
	const [file, setFile] = React.useState(null);
	const [newUser, setNewUser] = React.useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		dp: "",
	});
	const { firstName, lastName, email, password, dp } =
		newUser;

	const handleChangeFor = (prop) => (e) => {
		setNewUser({ ...newUser, [prop]: e.target.value });
	};

	const navigate = useNavigate();

	const handleImgInputChange = (e) => {
		if (!e || !e.target || !e.target.files) return;
		const image = e.target.files[0];
		if (!image) return;

		if (image.size > 1024 * 1024 * 2) {
			return toast.error("Image size is too large");
		}
		setNewUser({
			...newUser,
			dp: image,
		});
	};
	const handleSubmit = async (event) => {
		try {
			event.preventDefault();
			console.log(newUser);
			const user = new FormData();
			user.append("image", dp);
			user.append("firstName", firstName);
			user.append("lastName", lastName);
			user.append("email", email);
			user.append("password", password);

			if (!user.get("email")) {
				console.error("Email is required");
				toast.error("Email is required");
				return;
			} else if (!user.get("password")) {
				console.error("Password is required");
				toast.error("Password is required");
				return;
			}

			const res = await signup(user);
			console.log(res);
			// if (res.ok) navigate("/login"); // Redirect to the home page
		} catch (error) {
			console.error(error.message);
			toast.error(error.message); // Show error toast
		}
	};

	return (
		<ThemeProvider theme={createTheme()}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign up
					</Typography>
					<Box
						component="form"
						onSubmit={handleSubmit}
						noValidate
						sx={{ mt: 3 }}
					>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									name="firstName"
									fullWidth
									id="firstName"
									label="First Name"
									autoFocus
									onChange={handleChangeFor("firstName")}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									fullWidth
									id="lastName"
									label="Last Name"
									name="lastName"
									onChange={handleChangeFor("lastName")}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									onChange={handleChangeFor("email")}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									onChange={handleChangeFor("password")}
								/>
							</Grid>

							<Grid item xs={12}>
								<InputLabel htmlFor="file">
									Profile Picture
								</InputLabel>
								<TextField
									required
									fullWidth
									name="dp"
									type="file"
									id="dp"
									accept="image/*"
									onChange={handleImgInputChange}
								/>
							</Grid>
						</Grid>

						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Sign Up
						</Button>
						<Grid container justifyContent="flex-end">
							<Grid item>
								<NavLink
									style={{
										fontSize: ".8rem",
										fontStyle: "underline",
									}}
									to="/login"
								>
									Already have an account? Log in
								</NavLink>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}

function ForgotPassword() {
	const navigate = useNavigate();
	const handleSubmit = (event) => {
		try {
			event.preventDefault();
			const data = new FormData(event.currentTarget);
			console.log({
				email: data.get("email"),
			});
			// Add your password reset logic here
			navigate("/login"); // Redirect to the home page
		} catch (error) {
			console.error(error.message);
			// Handle the error here
		}
	};

	return (
		<ThemeProvider theme={createTheme()}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Forgot Password
					</Typography>
					<Box
						component="form"
						onSubmit={handleSubmit}
						noValidate
						sx={{ mt: 3 }}
					>
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Send Reset Link
						</Button>
						<Grid container justifyContent="flex-end">
							<Grid item>
								<NavLink style={{ fontSize: ".8rem" }} to="/login">
									Back to Log In
								</NavLink>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}

export { SignUp, LogIn, ForgotPassword };
