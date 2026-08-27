import { Interval } from "../classes/interval.js"
import { Timer } from "../classes/timer.js"

export function editTimer(id) {
    let timer = Timer.timers.filter(t => t.id == id)
    if (timer.length != 0) {
        localStorage.setItem('intervals', JSON.stringify({
            timerId: id,
            intervals: timer[0].intervals
        }))
        window.location.href = '../html/create-timer.html'
    }
}