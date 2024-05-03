import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import Container from "@mui/material/Container";

import MenuItem from "@mui/material/MenuItem";

import { NavLink, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/userContext";

function Header() {
	const { user } = useUserContext();
	const navigate = useNavigate();

	const [anchorElUser, setAnchorElUser] =
		React.useState(null);

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleLogIn = () => {
		handleCloseUserMenu();
		navigate("/login");
	};

	const handleLogout = () => {
		localStorage.removeItem("user-jwt-token");
		localStorage.removeItem("user");
		window.location.reload();
	};

	return (
		<AppBar position="fixed">
			<Container maxWidth="sm">
				<Toolbar disableGutters>
					<Box
						style={{
							display: "flex",
							width: "100%",
							justifyContent: "space-between",
							color: "white",
						}}
					>
						<NavLink style={{ color: "white" }} to="/">
							<MenuItem onClick={handleCloseUserMenu}>
								<Typography textAlign="center">Home</Typography>
							</MenuItem>
						</NavLink>

						{localStorage.getItem("user") ? (
							<>
								<NavLink
									style={{ color: "white" }}
									to={user ? "/profile" : "/login"}
								>
									<MenuItem onClick={handleCloseUserMenu}>
										<Typography textAlign="center">
											Profile
										</Typography>
									</MenuItem>
								</NavLink>

								<NavLink
									style={{ color: "white" }}
									to={user ? "/add-news" : "/login"}
								>
									<MenuItem onClick={handleCloseUserMenu}>
										<Typography textAlign="center">
											Add news
										</Typography>
									</MenuItem>
								</NavLink>

								<MenuItem onClick={handleLogout}>
									<Typography textAlign="center">Logout</Typography>
								</MenuItem>
							</>
						) : (
							<MenuItem onClick={handleLogIn}>
								<Typography textAlign="center">Login</Typography>
							</MenuItem>
						)}
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}

export default Header;
