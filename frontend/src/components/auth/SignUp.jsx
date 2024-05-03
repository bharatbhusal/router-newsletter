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
import { signup } from "../../apis/authAPIs";

import { toast } from "react-toastify";
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

			if (!user.email) {
				console.error("Email is required");
				toast.error("Email is required");
				return;
			} else if (!user.password) {
				console.error("Password is required");
				toast.error("Password is required");
				return;
			}
			console.log(user);
			await signup(user);
			navigate("/login"); // Redirect to the home page
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
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									fullWidth
									id="lastName"
									label="Last Name"
									name="lastName"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
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

export default SignUp;
