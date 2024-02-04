import React from 'react';
import './MonthlyView.css'; // Import your CSS file

const MonthlyView = ({ year, month, newsData }) => {
    return (
        <div className="monthly-view-card">
            <h2>{`${month} ${year} News`}</h2>
            {Object.keys(newsData).map(day => (
                <div key={day} className="day-card">
                    <h3>{`${month} ${day}, ${year}`}</h3>
                    <ul>
                        {newsData[day].map((article, index) => (
                            <li key={index}>
                                <strong>{article.headline}</strong> - {article.source}
                                <p>{article.summary}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default MonthlyView;
