import React, { useState, useEffect } from 'react';

const DownloadHandler = () => {
    const handleDownloadToday = () => {
        return <NewsTextFileGenerator />;
    };

    return (
        <div className='download'>
            {handleDownloadToday()}
        </div>
    );
};

const NewsTextFileGenerator = () => {
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [newsData, setNewsData] = useState({});

    useEffect(() => {
        const getTodayDate = () => {
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
            const day = currentDate.getDate().toString().padStart(2, '0');
            setSelectedDay(day);
            setSelectedMonth(month);
        };

        const loadNewsData = async () => {
            getTodayDate();
            try
            {
                const currentMonth = new Date().toLocaleString('default', { month: 'long' }).toLowerCase();
                const loadedNewsData = await import(`../news/2024/${currentMonth}.json`);
                setNewsData(loadedNewsData);
            } catch (error)
            {
                console.error('Error loading news data:', error);
            }
        };

        loadNewsData();
    }, []);

    // Function to generate the text content for a specific day
    const generateTextContent = () => {
        let textContent = '';

        // Check if the selected day exists in the newsData
        if (newsData[selectedDay])
        {
            // Add day and date to the text content
            const dateString = new Date(`2024-${selectedMonth}-${selectedDay}`).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long',
            });

            textContent += `Hi Guys.\n\n`;

            // Loop through each article for the selected day
            newsData[selectedDay].forEach((article, index) => {
                // Add article details to the text content
                textContent += `${index + 1}. ${article.headline}\n${article.source}\n${article.summary}\n\n`;
            });
            textContent += `\n\n${dateString}.\nGoodnight.\nThank You.`;
        }

        return textContent;
    };

    // Function to handle download button click
    const handleDownload = () => {
        const textContent = generateTextContent();
        if (textContent)
        {
            const blob = new Blob([textContent], { type: 'text/plain' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `news_summary_${selectedMonth}_${selectedDay}.txt`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else
        {
            alert(`No news available for ${selectedDay}`);
        }
    };

    return (
        <div className='download'>
            <button onClick={handleDownload}>Download News Summary for {selectedMonth} {selectedDay}</button>
        </div>
    );
};

export default DownloadHandler;