const downloader = (textContent, fileName) => {
    if (textContent)
    {
        // Create a Blob containing the text content
        const blob = new Blob([textContent], { type: 'text/plain' });

        // Create a temporary anchor element
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName; // Set the file name for download

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

module.exports = downloader;