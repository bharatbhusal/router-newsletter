import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Dp from "../assets/images/face.png";
import Logo from "../assets/images/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/userContext";

function NavBar() {
	const { user } = useUserContext();
	const navigate = useNavigate();
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] =
		React.useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

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
			<Container maxWidth="md">
				<Toolbar disableGutters>
					<NavLink to="/">
						<Typography
							variant="h6"
							noWrap
							sx={{
								mr: 2,
								display: { xs: "none", md: "flex" },
								fontFamily: "monospace",
								fontWeight: 700,
								letterSpacing: ".3rem",
								color: "inherit",
								textDecoration: "none",
							}}
						>
							<img src={Logo} width={"150rem"} alt="" />
						</Typography>
					</NavLink>
					<Box
						sx={{
							flexGrow: 1,
							display: { xs: "flex", md: "none" },
						}}
					>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: "block", md: "none" },
							}}
						>
							<NavLink
								style={{ color: "black" }}
								to="/contributors"
							>
								<MenuItem onClick={handleCloseNavMenu}>
									<Typography textAlign="center">
										Contributors
									</Typography>
								</MenuItem>
							</NavLink>

							<NavLink style={{ color: "black" }} to="/about-us">
								<MenuItem onClick={handleCloseNavMenu}>
									<Typography textAlign="center">
										About us
									</Typography>
								</MenuItem>
							</NavLink>
							<NavLink style={{ color: "black" }} to="/donate">
								<MenuItem onClick={handleCloseNavMenu}>
									<Typography textAlign="center">Donate</Typography>
								</MenuItem>
							</NavLink>
						</Menu>
					</Box>
					<NavLink to="/">
						<Typography
							variant="h5"
							noWrap
							sx={{
								mr: 2,
								display: { xs: "flex", md: "none" },
								flexGrow: 1,
								fontFamily: "monospace",
								fontWeight: 700,
								letterSpacing: ".3rem",
								color: "inherit",
								textDecoration: "none",
							}}
						>
							<img src={Logo} width={"130rem"} alt="" />
						</Typography>
					</NavLink>
					<Box
						sx={{
							flexGrow: 1,
							display: { xs: "none", md: "flex" },
						}}
					>
						<NavLink
							style={{ color: "black" }}
							to="/contributors"
						>
							<Button
								onClick={handleCloseNavMenu}
								sx={{ my: 2, color: "white", display: "block" }}
							>
								Contributors
							</Button>
						</NavLink>

						<NavLink style={{ color: "black" }} to="/about-us">
							<Button
								onClick={handleCloseNavMenu}
								sx={{ my: 2, color: "white", display: "block" }}
							>
								About Us
							</Button>
						</NavLink>
						<NavLink style={{ color: "black" }} to="/donate">
							<Button
								onClick={handleCloseNavMenu}
								sx={{ my: 2, color: "white", display: "block" }}
							>
								Donate
							</Button>
						</NavLink>
					</Box>

					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Open settings">
							<IconButton
								onClick={handleOpenUserMenu}
								sx={{ p: 0 }}
							>
								<Avatar
									style={{
										border: "1px solid #bb2765",
										backgroundColor: "#fff7",
									}}
									alt="Remy Sharp"
									src={Dp}
								/>
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: "45px" }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							<NavLink
								style={{ color: "black" }}
								to={user ? "/profile" : "/login"}
							>
								<MenuItem onClick={handleCloseUserMenu}>
									<Typography textAlign="center">Profile</Typography>
								</MenuItem>
							</NavLink>

							<NavLink style={{ color: "black" }} to="/dashboard">
								<MenuItem onClick={handleCloseUserMenu}>
									<Typography textAlign="center">
										Dashboard
									</Typography>
								</MenuItem>
							</NavLink>
							{localStorage.getItem("user") ? (
								<MenuItem onClick={handleLogout}>
									<Typography textAlign="center">Logout</Typography>
								</MenuItem>
							) : (
								<MenuItem onClick={handleLogIn}>
									<Typography textAlign="center">Login</Typography>
								</MenuItem>
							)}
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}

export { NavBar };
