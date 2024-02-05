import React, { useRef } from 'react'

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
                    <li key={index}>{month}</li>
                ))}
            </ul>
            <div onClick={scrollRight} className='scroll-right'>➡</div>
        </nav>
    )
}

export default NavBar