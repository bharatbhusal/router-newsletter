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
            const day = (currentDate.getDate() - 1).toString().padStart(2, '0');
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
            const dateString = new Date(`2024-${selectedMonth}-${selectedDay - 1}`).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long',
            });

            textContent += `Hi Guys.\n\n`;

            // Loop through each article for the selected day
            newsData[selectedDay].forEach((article) => {
                // Add article details to the text content
                textContent += `${article.headline}\n${article.summary}\n${article.source}\n\n`;
            });
            textContent += `\n\nHosted: https://router-newsletter.vercel.app\n${dateString}.\nGoodnight.\nThank You.`;
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
            alert(`No news available for ${selectedMonth}-${selectedDay}`);
        }
    };

    return (
        <div className='download'>
            <button onClick={handleDownload}>Download Today's News Summary</button>
        </div>
    );
};

export default DownloadHandler;
