const removeDuplicatesFromTwoArrays = (prevArray: any[], newArray: any[]): any[] => {
    const uniqueArray = []
    let isDuplicate = false;

    for (const newValue of newArray) {
        for (const prevValue of prevArray) {
            if (JSON.stringify(newValue) === JSON.stringify(prevValue)) {
                isDuplicate = true
                break;
            }
        }
        if (!isDuplicate) {
            uniqueArray.push(newValue)
        }
        isDuplicate = false
    }
    return uniqueArray;
}

export default removeDuplicatesFromTwoArrays