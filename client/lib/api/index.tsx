export const getClockList = async () => {
    // Instead of the file system,
    // fetch post data from an external API endpoint
    const res = await fetch('http://127.0.0.1:8000/api/location/')
    if (!res.ok) {
        throw new Error('Network response was not ok')
    }
    return res.json()
}

export const deleteClockList = async () => {
    // Instead of the file system,
    // fetch post data from an external API endpoint
    const res = await fetch('http://127.0.0.1:8000/api/location/')
    if (!res.ok) {
        throw new Error('Network response was not ok')
    }
    return res.json()
}
