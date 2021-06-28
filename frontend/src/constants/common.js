function hasMoreElementsInList(oldList, newList, initialSize) {
    return oldList === undefined ||
        newList.length < initialSize ||
        oldList.length == newList.length
}

export { hasMoreElementsInList };