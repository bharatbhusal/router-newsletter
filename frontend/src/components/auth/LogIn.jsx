import React from "react";
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
import { login } from "../../apis/authAPIs";
import { useUserContext } from "../../context/userContext";

import { toast } from "react-toastify";

function LogIn() {
	const { setUser } = useUserContext();
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
				navigate("/");
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

export default LogIn;
