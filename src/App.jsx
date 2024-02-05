import React, { useRef } from 'react';
import "./App.css";
import MonthlyView from './components/MonthlyView';
import january from "./news/2024/january.json";
import NavBar from './components/NavBar';
import { Outlet } from 'react-router-dom';


const App = () => {


    return (
        <div style={{ gap: "0.4rem" }}>
            <div className='container'>
                <Outlet />
            </div>
            <NavBar />
        </div>
    );
};

export default App;
