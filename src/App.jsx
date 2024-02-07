import React from 'react';
import "./App.css";
import NavBar from './components/NavBar';
import { Outlet } from 'react-router-dom';
import { getToday, getYesterday } from './utils/dateTimeHandler';
import timeHandle from "./utils/dateTimeHandler"
import downloader from './utils/downloader';
import NewsTextFileGenerator from './components/NewsTextFileGenerator';

const App = () => {

    return (
        <div className='container'>
            <NewsTextFileGenerator />
            <Outlet />
            <NavBar />

        </div>
    );
};

export default App;
