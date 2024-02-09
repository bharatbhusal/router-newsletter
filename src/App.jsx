import React from 'react';
import "./App.css";
import NavBar from './components/NavBar';
import { Outlet } from 'react-router-dom';

const App = () => {

    return (
        <div className='container flex space-around'>
            <Outlet />
            <NavBar />
        </div>
    );
};

export default App;
