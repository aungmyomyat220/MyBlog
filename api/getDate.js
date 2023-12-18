export const getDate  = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Months are zero-indexed, so we add 1
    const day = currentDate.getDate();
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;

    return {
        date: `${year}-${formattedMonth}-${formattedDay}`
    };
}

export const formatDate = (date) => {
    const postDate = new Date(date);
    const now = new Date();
    const timeDifference = now - postDate;
    if (timeDifference < 60000) { // Less than 1 minute
        return 'just now';
    } else if (timeDifference < 3600000) { // Less than 1 hour
        const minutesDifference = Math.floor(timeDifference / 60000);
        return minutesDifference === 1 ? '1 minute ago' : `${minutesDifference} minutes ago`;
    } else if (timeDifference < 86400000) { // Less than 1 day
        const hoursDifference = Math.floor(timeDifference / 3600000);
        return hoursDifference === 1 ? '1 hour ago' : `${hoursDifference} hours ago`;
    } else if (timeDifference < 2592000000) { // Less than 30 days (approximately 1 month)
        const daysDifference = Math.floor(timeDifference / 86400000);
        return daysDifference === 1 ? '1 day ago' : `${daysDifference} days ago`;
    } else {
        const monthsDifference = Math.floor(timeDifference / 2592000000);
        return monthsDifference === 1 ? '1 month ago' : `${monthsDifference} months ago`;
    }
};
