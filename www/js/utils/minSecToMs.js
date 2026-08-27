export function minSecToMs(timeStr) {
    const parts = timeStr.split(':')
    let min = parseInt(parts[0], 10) || 0
    let sec = parseInt(parts[1], 10) || 0
    
    min += Math.floor(sec / 60)
    sec = sec % 60
    
    return (min * 60 + sec) * 1000
}