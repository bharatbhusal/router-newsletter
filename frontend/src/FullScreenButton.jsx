import React, { useEffect, useState } from "react";

const FullScreenButton = () => {
	const [isFullScreen, setIsFullScreen] = useState(false);

	const toggleFullScreen = () => {
		if (!isFullScreen) {
			document.documentElement.requestFullscreen();
		} else {
			document.exitFullscreen();
		}
	};

	useEffect(() => {
		const handleFullScreenChange = () => {
			setIsFullScreen(document.fullscreenElement !== null);
		};

		document.addEventListener(
			"fullscreenchange",
			handleFullScreenChange
		);

		return () => {
			document.removeEventListener(
				"fullscreenchange",
				handleFullScreenChange
			);
		};
	}, []);

	return (
		<button onClick={toggleFullScreen}>
			{isFullScreen ? "Exit Full Screen" : "Full Screen"}
		</button>
	);
};

export default FullScreenButton;
