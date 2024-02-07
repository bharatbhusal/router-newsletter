const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
];

function getToday() {
    const today = new Date();
    return {
        day: today.getDate().toString().padStart(2, "0"),
        month: {
            number: (today.getMonth() + 1).toString().padStart(2, "0"),
            name: months[today.getMonth()]
        },
        year: today.getFullYear(),
        dayName: today.toLocaleDateString('en-US', { weekday: 'long' }),
        hour: today.getHours().toString().padStart(2, "0"),
        minute: today.getMinutes().toString().padStart(2, "0"),
        second: today.getSeconds().toString().padStart(2, "0")
    };
}

function getYesterday() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return {
        day: yesterday.getDate().toString().padStart(2, "0"),
        month: {
            number: (yesterday.getMonth() + 1).toString().padStart(2, "0"),
            name: months[yesterday.getMonth()]
        },
        year: yesterday.getFullYear(),
        dayName: yesterday.toLocaleDateString('en-US', { weekday: 'long' }),
        hour: yesterday.getHours().toString().padStart(2, "0"),
        minute: yesterday.getMinutes().toString().padStart(2, "0"),
        second: yesterday.getSeconds().toString().padStart(2, "0")
    };
}

module.exports = { getToday, getYesterday };
