import React from 'react';

const MonthlyView = ({ year, month, newsData }) => {

    if (!newsData || Object.keys(newsData).length === 0)
    {
        return <div className="table-mini">
            <div className="future">
                You are in the future
            </div>
        </div>;
    }

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
