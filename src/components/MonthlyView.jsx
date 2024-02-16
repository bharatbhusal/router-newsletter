import React, { useState } from 'react';
import { FaDownload } from "react-icons/fa6";
import { generateTextContent, copyToClipboard, textDownloader } from '../utils/downloader';

const MonthlyView = ({ year, month, newsData }) => {
    const [showCopiedMessage, setShowCopiedMessage] = useState(false); // State to manage the visibility of the "Copied to clipboard" message

    if (!newsData || Object.keys(newsData).length === 0)
    {
        return (
            <div className="table-mini">
                <div className="future flex space-around">
                    You are in the future
                </div>
            </div>
        );
    }

    const sortedDays = Object.keys(newsData).sort((a, b) => parseInt(b, 10) - parseInt(a, 10));

    const CopyToClipboard = ({ newsDay }) => {

        const handleCopyToClipboard = () => {
            navigator.clipboard.writeText(generateTextContent(newsData[newsDay], month, newsDay))
            // copyToClipboard(generateTextContent(newsData[newsDay], month, newsDay));
            // textDownloader(generateTextContent(newsData[newsDay], month, newsDay), "name")
            setShowCopiedMessage(true); // Set state to show the "Copied to clipboard" message
            // Hide the message after a certain duration (e.g., 2 seconds)
            setTimeout(() => {
                setShowCopiedMessage(false);
            }, 2000);
        }

        return (
            <div className="download flex space-around" onClick={(handleCopyToClipboard)}>
                <FaDownload />
            </div>
        )
    }

    return (
        <div className="table-mini">
            <div className='table-mini-inner'>
                {sortedDays.map(day => {
                    const unpaddedDay = parseInt(day, 10);
                    const monthNameToNumber = {
                        January: 0,
                        February: 1,
                        March: 2,
                        April: 3,
                        May: 4,
                        June: 5,
                        July: 6,
                        August: 7,
                        September: 8,
                        October: 9,
                        November: 10,
                        December: 11,
                    };

                    // Assuming month is the name of the month (e.g., "January")
                    const monthNumber = monthNameToNumber[month];

                    const date = new Date(year, monthNumber, unpaddedDay); // Use the converted month number

                    const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' });

                    return (
                        <div key={day}>
                            <ul>
                                <div className='daily-header flex space-between'>
                                    <h3>{`${month} ${unpaddedDay}, ${year} | ${dayOfWeek}`}</h3>
                                    <CopyToClipboard newsDay={day} />
                                </div>
                                {newsData[day].map((article, index) => (
                                    <li key={index} className='flex space-around'>
                                        <a href={article.source} target='_blank'>
                                            <strong>{article.headline}</strong>
                                            <p>{article.summary}</p>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>
            {showCopiedMessage && <div className="copied-message">Copied to Clipboard</div>}
        </div>
    );
};

export default MonthlyView;
