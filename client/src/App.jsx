import React from "react";
import Button from "./components/atoms/Button/Button";

const App = () => {
	return (
		<div>
			<Button
				disabled={true}
				label="Click me"
				onClick={() => alert("Button clicked")}
			/>
		</div>
	);
};

export default App;
