import React from 'react';
import "./App.css";
import NavBar from './components/NavBar';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';

const App = () => {

    return (
        <div className='container flex flex-column space-between'>
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default App;
