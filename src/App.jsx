import React from 'react';
import "./App.css";
import NavBar from './components/NavBar';
import { Outlet } from 'react-router-dom';
import DownloadHandler from './components/DownloadHandler';


const App = () => {
    return (
        // <div style={{ gap: "0.4rem" }}>
        <div className='container'>
            <DownloadHandler />
            <Outlet />
            <NavBar />
            {/* </div> */}
        </div>
    );
};

export default App;
