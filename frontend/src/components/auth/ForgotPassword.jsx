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
import { signup, login } from "../../apis/authAPIs";
import { useUserContext } from "../../context/userContext";

import { toast } from "react-toastify";
import { InputLabel } from "@mui/material";

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

export default ForgotPassword;
