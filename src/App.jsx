import React, { useRef } from 'react';
import "./App.css";
import MonthlyView from './components/MonthlyView';
import january from "./news/2024/january.json";
import NavBar from './components/NavBar';


const App = () => {


    return (
        <div style={{ gap: "0.4rem" }}>
            <div className='container'>
                <MonthlyView year="2024" month="January" newsData={january} />
            </div>
            <NavBar />
        </div>
    );
};

export default App;
