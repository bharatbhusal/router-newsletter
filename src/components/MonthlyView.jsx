import React from 'react';

const MonthlyView = ({ year, month, newsData }) => {
    return (
        <div className="table-mini">

            {Object.keys(newsData).map(day => (
                <div key={day}>
                    <ul>
                        <h3>{`${month} ${day}, ${year}`}</h3>
                        {newsData[day].map((article, index) => (
                            <li key={index}>
                                <a href={article.source} target='_blank'>
                                    <strong>{article.headline}</strong>
                                    <p>{article.summary}</p>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default MonthlyView;
