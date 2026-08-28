export function getReadableDateTime(dateString) {
    return dateString.replace('T', ' ').substring(0, 16);
}
