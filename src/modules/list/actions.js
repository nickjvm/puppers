export function storeList (data) {
    return {
        type: 'STORE_LIST',
        data
    }
}


export function setLocation (event) {
    return {
        type: 'SET_LOCATION',
        data: event.target.value
    }
}

export function storeCoordinates (data) {
    return {
        type: 'STORE_LONGLAT',
        data
    }
}