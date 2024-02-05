import React from 'react';

const NewsTextFileGenerator = ({ newsData, selectedDay, selectedMonth }) => {
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

export default NewsTextFileGenerator;
