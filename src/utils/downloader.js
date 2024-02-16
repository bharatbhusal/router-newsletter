
import jsPDF from 'jspdf'; // Import jsPDF library


export const generateTextContent = (newsData, month, day) => {
    if (newsData)
    {
        const greeting = "Hi Guys."
        const farewale = `Host: https://router-newsletter.vercel.app\n${month} ${parseInt(day)}, 2024.\nThank you.\nGoodnight.`
        const content = newsData.map(each => `${each.headline}\n${each.summary}\n${each.source}\n\n`).join('');
        return `${greeting}\n\n${content}\n\n${farewale}`;
    }
    return '';
};


export const textDownloader = (textContent, fileName) => {
    if (textContent)    
    {
        // Create a Blob containing the text content
        const blob = new Blob([textContent], { type: 'text/plain' });

        // Create a temporary anchor element
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `News-${fileName}`; // Set the file name for download

        // Append the anchor element to the DOM and trigger a click event
        document.body.appendChild(link);
        link.click();

        // Clean up by removing the anchor element from the DOM
        document.body.removeChild(link);
    } else
    {
        alert(`No news available for ${fileName}`);
    }
};

export const copyToClipboard = (textContent) => {
    if (textContent)
    {
        try
        {
            // Copy the selected text to the clipboard
            navigator.clipboard.writeText(textContent)
            console.log('Text copied to clipboard');
        } catch (err)
        {
            console.error('Failed to copy text: ', err);
        }
    } else
    {
        alert('No text content available to copy');
    }
};


export const pdfDownloader = (textContent, fileName) => {
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
        pdf.save(`News-${fileName}`);
    } else
    {
        alert(`No news available for ${fileName}`);
    }
};

