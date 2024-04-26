import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
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

function LogIn() {
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		try {
			event.preventDefault();
			const data = new FormData(event.currentTarget);
			const user = {
				email: data.get("email"),
				password: data.get("password"),
			};
			const detail = await login(user);
			localStorage.setItem("user-jwt-token", detail.token);
			localStorage.setItem(
				"user",
				JSON.stringify(detail.user)
			);
			if (localStorage.getItem("user-jwt-token")) {
				navigate("/"); // Redirect to the home page
				window.location.reload();
			}
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
						<FormControlLabel
							control={
								<Checkbox value="remember" color="primary" />
							}
							label="Remember me"
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
	const navigate = useNavigate();
	const handleSubmit = async (event) => {
		try {
			event.preventDefault();
			const data = new FormData(event.currentTarget);
			const user = {
				firstName: data.get("firstName"),
				lastName: data.get("lastName"),
				email: data.get("email"),
				password: data.get("password"),
			};
			const res = await signup(user);
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
									autoComplete="fname"
									name="firstName"
									required
									fullWidth
									id="firstName"
									label="First Name"
									autoFocus
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									fullWidth
									id="lastName"
									label="Last Name"
									name="lastName"
									autoComplete="lname"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
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
									autoComplete="new-password"
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
			const user = {
				email: data.get("email"),
			};
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
