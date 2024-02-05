import React from 'react';
import "./App.css";
import NavBar from './components/NavBar';
import { Outlet } from 'react-router-dom';
import DownloadHandler from './components/DownloadHandler';


const App = () => {
    return (
        <div className='container'>
            <DownloadHandler />
            <Outlet />
            <NavBar />
        </div>
    );
};

export default App;
