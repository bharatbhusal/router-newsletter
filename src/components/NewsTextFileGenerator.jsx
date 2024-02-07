import React, { useState, useEffect } from 'react';
import { getToday, getYesterday } from '../utils/dateTimeHandler'; // Import the timeHandler object


const NewsTextFileGenerator = () => {
    const [today, setToday] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(null);
    const [newsData, setNewsData] = useState(null);

    useEffect(() => {
        const loadNewsData = async () => {
            try
            {
                const { day, month } = getToday(); // Get today's date from timeHandler
                setToday(day);
                setCurrentMonth(month.name);

                const currentMonthData = await import(`../news/2024/${month.name.toLowerCase()}.json`);

                // Iterate through the days in reverse order until a non-empty day's data is found
                const days = []
                Object.keys(currentMonthData).map((each) => days.push(parseInt(each)));

                for (let i = parseInt(day); i > 0; i--)
                {
                    const tempData = currentMonthData[i.toString().padStart(2, "0")];
                    if (tempData)
                    {
                        setNewsData({
                            "day": i,
                            "news": tempData
                        });
                        break;
                    }
                }
            } catch (error)
            {
                console.error('Error loading news data:', error);
            }
        };

        loadNewsData();
    }, []);

    // Function to generate the text content for a specific day
    const generateTextContent = () => {
        var content = "Hi Guys.\n\n";

        if (newsData)
        {
            console.log(newsData.news)
            newsData.news.map((each) => {
                content += each.headline + "\n" + each.summary + "\n" + each.source + "\n\n"
            })
            content += `\n\n\nHost: https://router-newsletter.vercel.app\n${currentMonth} ${parseInt(newsData.day)}, 2024.\nThank you.\nGoodnight.`
        }
        return content
    };

    // Function to handle download button click
    const handleDownload = () => {
        const textContent = generateTextContent();
        if (textContent)
        {
            const blob = new Blob([textContent], { type: 'text/plain' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `news_summary_${currentMonth}_${newsData.day}.txt`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else
        {
            alert(`No news available for ${selectedMonth} ${parseInt(selectedDay)}`);
        }
    };

    return (
        <div className='download'>
            <button onClick={handleDownload}>Download Latest News Summary</button>
        </div>
    );
};

export default NewsTextFileGenerator;
