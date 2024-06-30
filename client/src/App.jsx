import { useSelector } from "react-redux";
import "./App.css";
import Auth from "./pages/auth/Auth";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import {
	Routes,
	Route,
	Navigate,
	Outlet,
} from "react-router-dom";
import NavBar from "./components/navBar/NavBar";
import Posts from "./components/posts/Posts";
import History from "./components/history/History";

// Layout component for pages with NavBar
const LayoutWithNavBar = () => (
	<>
		<NavBar />
		<Outlet />
	</>
);

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
					path="/auth"
					element={user ? <Navigate to="/posts" /> : <Auth />}
				/>
				<Route element={<LayoutWithNavBar />}>
					<Route
						path="/home"
						element={user ? <Home /> : <Navigate to="/auth" />}
					/>

					<Route path="/history" element={<History />} />
					<Route path="/posts" element={<Posts />} />
					<Route
						path="/profile/:id"
						element={user ? <Profile /> : <Navigate to="/auth" />}
					/>
				</Route>
			</Routes>
		</div>
	);
}

export default App;
