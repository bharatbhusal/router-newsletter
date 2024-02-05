// Importing the necessary function from the react-dom library
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import January from "./news/2024/january.json"
import February from "./news/2024/february.json"
import March from "./news/2024/march.json"
import April from "./news/2024/april.json"
import May from "./news/2024/may.json"
import June from "./news/2024/june.json"
import July from "./news/2024/july.json"
import August from "./news/2024/august.json"
import September from "./news/2024/september.json"
import October from "./news/2024/october.json"
import November from "./news/2024/november.json"
import December from "./news/2024/december.json"

// Importing the main App component from the "./App" file

import App from "./App";
import "./index.css";
import MonthlyView from "./components/MonthlyView";

// Getting the DOM element with the id "root"
const divContainer = document.getElementById("root");
// Creating a root for the React application using createRoot and associating it with the divContainer
const root = createRoot(divContainer);


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <>Error Page</>,
        children: [
            {
                errorElement: <>Error Page</>,
                children: [
                    {
                        index: true,
                        element: <MonthlyView year="2024" month="January" newsData={January} />
                    },
                    {
                        path: "january",
                        element: <MonthlyView year="2024" month="January" newsData={January} />,
                    },
                    {
                        path: "february",
                        element: <MonthlyView year="2024" month="February" newsData={February} />,
                    },
                    {
                        path: "march",
                        element: <MonthlyView year="2024" month="March" newsData={March} />,
                    },
                    {
                        path: "april",
                        element: <MonthlyView year="2024" month="April" newsData={April} />,
                    },
                    {
                        path: "may",
                        element: <MonthlyView year="2024" month="May" newsData={May} />,
                    },
                    {
                        path: "june",
                        element: <MonthlyView year="2024" month="June" newsData={June} />,
                    },
                    {
                        path: "july",
                        element: <MonthlyView year="2024" month="July" newsData={July} />,
                    },
                    {
                        path: "august",
                        element: <MonthlyView year="2024" month="August" newsData={August} />,
                    },
                    {
                        path: "september",
                        element: <MonthlyView year="2024" month="September" newsData={September} />,
                    },
                    {
                        path: "october",
                        element: <MonthlyView year="2024" month="October" newsData={October} />,
                    },
                    {
                        path: "november",
                        element: <MonthlyView year="2024" month="November" newsData={November} />,
                    },
                    {
                        path: "december",
                        element: <MonthlyView year="2024" month="December" newsData={December} />,
                    },
                ]

            },

        ],
    },
])

// Rendering the main App component within the root
root.render(<RouterProvider router={router} />)
