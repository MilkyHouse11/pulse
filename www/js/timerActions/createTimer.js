import { Interval } from '../classes/interval.js'
import { Timer } from '../classes/timer.js'

export function createTimer() {
    let maxId = false
    let id = 1

    if (Interval.intervals.intervals.length == 0) {
        return;
    }

    let name = document.querySelector('#timer-name').value

    if (name.trim().length == 0) {
        return
    }

    if (Interval.intervals.timerId != 0) {
        let timer = Timer.timers.filter(t => t.id == Interval.intervals.timerId)

        if (timer.length > 0) {
            timer = timer[0]
            timer.intervals = Interval.intervals.intervals
            timer.title = name
        }
    }
    else {
        if (Timer.timers.length != 0) {
            maxId = Timer.timers.reduce((min, cur) => {
                return cur.id > min.id ? cur : min
            })
        }

        if (maxId) {
            id = maxId.id + 1
        }

        let timer = new Timer(id, name, Interval.intervals.intervals)

        Timer.timers.push(timer)
    }

    localStorage.setItem('timers', JSON.stringify(Timer.timers))
    localStorage.removeItem('intervals')

    window.location.href = '../html/main.html'
}