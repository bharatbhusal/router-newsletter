import React, { useState } from 'react';
import { FaDownload } from "react-icons/fa6";
import { IoMenuSharp } from "react-icons/io5";
import RouterLogo from "../assets/logo.svg";
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return (
        <nav>
            <img src={RouterLogo} alt="router logo" />
            <div>
                <div className="dropdown" onClick={toggleDropdown}>
                    Month
                    {isDropdownOpen && (
                        <div className="dropdown-content">
                            {months.map((month, index) => (

                                <NavLink key={index} to={month.toLocaleLowerCase()}>{month}</NavLink>
                            ))}
                        </div>
                    )}
                </div>
                <div className="download">
                    <FaDownload />
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
