function hasMoreElementsInList(oldList, newList, initialSize) {
    return oldList === undefined ||
        newList.length < initialSize ||
        oldList.length == newList.length
}

function getReadableDateTime(createdAt) {
    if (createdAt == undefined || createdAt === "") {
        return ""
    }

    const dateTime = new Date(createdAt);
    const date = dateTime.toISOString().split('T')[0];
    const time = dateTime.getHours() + ":" + dateTime.getMinutes();
    return date + ", " + time;
}

export { hasMoreElementsInList, getReadableDateTime };

