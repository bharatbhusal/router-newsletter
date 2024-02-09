import React, { useState, useEffect } from 'react';
import { getToday } from '../utils/dateTimeHandler'; // Import the timeHandler object
import { FaDownload } from "react-icons/fa6";
import jsPDF from 'jspdf'; // Import jsPDF library

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
                const days = Object.keys(currentMonthData).map(each => parseInt(each));

                for (let i = parseInt(day); i > 0; i--)
                {
                    const tempData = currentMonthData[i.toString().padStart(2, "0")];
                    if (tempData)
                    {
                        setNewsData({
                            day: i,
                            news: tempData
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
        if (newsData)
        {
            const content = newsData.news.map(each => `${each.headline}\n${each.summary}\n${each.source}\n\n`).join('');
            return `${content}\n\n\nHost: https://router-newsletter.vercel.app\n${currentMonth} ${parseInt(newsData.day)}, 2024.\nThank you.\nGoodnight.`;
        }
        return '';
    };

    // Function to handle download as text file
    const handleDownloadTxt = () => {
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
            alert(`No news available for ${currentMonth} ${parseInt(newsData.day)}`);
        }
    };// Function to handle download as PDF file
    const handleDownloadPdf = () => {
        const textContent = generateTextContent();
        if (textContent)
        {
            const pdf = new jsPDF();
            const marginX = 20;
            const marginY = 20;
            const lineHeight = 10; // Adjust line height as needed
            const pageHeight = pdf.internal.pageSize.height - 2 * marginY;
            let y = marginY;

            // Function to add text content to the current page
            const addTextToPage = () => {
                const lines = pdf.splitTextToSize(textContent, pdf.internal.pageSize.width - 2 * marginX);
                for (let line of lines)
                {
                    if (y + lineHeight > pageHeight)
                    {
                        pdf.addPage();
                        y = marginY;
                    }
                    pdf.text(line, marginX, y);
                    y += lineHeight;
                }
            };

            // Add text content with margins and handle pagination
            addTextToPage();

            // Save the PDF
            pdf.save(`newsSummary${currentMonth}_${newsData.day}.pdf`);
        } else
        {
            alert(`No news available for ${currentMonth} ${parseInt(newsData.day)}`);
        }
    };


    return (
        <div>
            <div title='Download as PDF File' className="download" onClick={handleDownloadPdf}>
                <FaDownload />
            </div>
        </div>
    );
};

export default NewsTextFileGenerator;
