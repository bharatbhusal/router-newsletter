import React, { useRef } from 'react';
import "./App.css";
import MonthlyView from './components/MonthlyView';
import january from "./news/2024/january.json";

const App = () => {
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
        <div style={{ gap: "0.4rem" }}>
            <div className='container'>
                <MonthlyView year="2024" month="January" newsData={january} />
            </div>
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
        </div>
    );
};

export default App;
