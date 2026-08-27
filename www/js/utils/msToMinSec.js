export function msToMinSec(ms) {
    let sec = Math.floor(ms / 1000)
    let min = Math.floor(sec / 60)
    return `${min.toString().padStart(2, '0')}:${(sec % 60).toString().padStart(2, '0')}`
}