import React, {
	createContext,
	useContext,
	useState,
} from "react";

const NewsContext = createContext();

export const useNewsContext = () => useContext(NewsContext);

export const NewsProvider = ({ children }) => {
	const [newsOfGivenDate, setNewsOfGivenDate] = useState([]);

	return (
		<NewsContext.Provider
			value={{
				setNewsOfGivenDate,
				newsOfGivenDate,
			}}
		>
			{children}
		</NewsContext.Provider>
	);
};
