import React, { useRef } from 'react'
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    const containerRef = useRef(null);

    const scrollLeft = () => {
        if (containerRef.current)
        {
            containerRef.current.scrollLeft -= 100; // Adjust the scroll distance as needed
        }
    };

    const scrollRight = () => {
        if (containerRef.current)
        {
            containerRef.current.scrollLeft += 100; // Adjust the scroll distance as needed
        }
    };
    return (
        <nav>
            <div onClick={scrollLeft} className='scroll-left'>⬅</div>
            <ul ref={containerRef} className='nav-list'>
                {[
                    'January', 'February', 'March', 'April',
                    'May', 'June', 'July', 'August',
                    'September', 'October', 'November', 'December'
                ].map((month, index) => (
                    <NavLink key={index} to={`${month.toLocaleLowerCase()}`} className={({ isActive, isPending }) =>
                        isActive
                            ? "active"
                            : isPending
                                ? "pending"
                                : ""}>{month}</NavLink>
                ))}
            </ul>
            <div onClick={scrollRight} className='scroll-right'>➡</div>
        </nav>
    )
}

export default NavBar