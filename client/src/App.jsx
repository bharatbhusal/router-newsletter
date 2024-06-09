import { useSelector } from "react-redux";
import "./App.css";
import Auth from "./pages/auth/Auth";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
	const user = useSelector(
		(state) => state.authReducer?.authData?.user
	);

	return (
		<div className="App">
			<Routes>
				<Route
					path="/"
					element={
						user ? (
							<Navigate to="/home" />
						) : (
							<Navigate to="/auth" />
						)
					}
				/>
				<Route
					path="/home"
					element={user ? <Home /> : <Navigate to="/auth" />}
				/>
				<Route
					path="/auth"
					element={user ? <Navigate to="/home" /> : <Auth />}
				/>
				<Route
					path="/profile/:id"
					element={user ? <Profile /> : <Navigate to="/auth" />}
				/>
			</Routes>
		</div>
	);
}

export default App;
