import React from 'react';
import "./App.css";
import NavBar from './components/NavBar';
import { Outlet } from 'react-router-dom';

const App = () => {

    return (
        <div className='container'>
            <Outlet />
            <NavBar />
        </div>
    );
};

export default App;
