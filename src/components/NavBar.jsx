import React, { useState } from 'react';
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
            <a href="https://www.routerprotocol.com/" target='_blank'>
                <img src={RouterLogo} alt="router logo" />
            </a>
            <div className="month" onClick={toggleDropdown}>
                Month
                {isDropdownOpen && (
                    <div className="months">
                        {months.map((month, index) => (
                            <NavLink key={index} to={month.toLocaleLowerCase()}>{month}</NavLink>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
}

export default NavBar;
