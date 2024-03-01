import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "./index.css";
import MonthlyView from "./components/MonthlyView";
import NotFoundPage from "./components/404Error";


// Array of month names
const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

// Dynamically import each month's data
const importMonthData = async (month) => (await import(`./news/2024/${month.toLowerCase()}.json`)).default;

// Create an object to store the imported month data
const monthDataPromises = months.map(month => importMonthData(month));

const initializeApp = async () => {
    const monthData = await Promise.all(monthDataPromises);

    // Getting the DOM element with the id "root"
    const divContainer = document.getElementById("root");

    // Creating a root for the React application using createRoot and associating it with the divContainer  
    const root = createRoot(divContainer);

    const router = createBrowserRouter([
        {
            path: "",
            element: <App />,
            errorElement: <NotFoundPage />,
            children: [
                {
                    errorElement: <NotFoundPage />,
                    children: [
                        {
                            index: true,
                            element: <MonthlyView year="2024" month="March" newsData={monthData[2]} />
                        },
                        ...months.map((month, index) => ({
                            path: month.toLowerCase(),
                            element: <MonthlyView year="2024" month={month} newsData={monthData[index]} />,
                        })),
                    ]
                },
            ],
        },
    ]);

    // Rendering the main App component within the root
    root.render(<RouterProvider router={router} />);
};

// Initialize the app
initializeApp();
