
export function truncateText(text, maxLength = 30) {

    if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
    }
    return text;
}