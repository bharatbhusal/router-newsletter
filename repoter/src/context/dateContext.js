import React, {
	createContext,
	useContext,
	useState,
} from "react";
import dayjs from "dayjs";

const DateContext = createContext();

export const useDateContext = () => useContext(DateContext);

export const DateProvider = ({ children }) => {
	const today = new Date();
	const dateShort = `${today.getFullYear()}-${
		today.getMonth() + 1
	}-${today.getDate()}`;

	const [date, setDate] = useState(dayjs(dateShort));
	return (
		<DateContext.Provider
			value={{
				setDate,
				date,
			}}
		>
			{children}
		</DateContext.Provider>
	);
};
