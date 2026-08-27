import { minSecToMs } from "../utils/minSecToMs.js"
import { Interval } from '../classes/interval.js'
import { updateTimerInfo } from '../updateTimerInfo.js'

export function inputDuration(id) {
    let interval = Interval.intervals.intervals.filter(i => i.id == id)

    if (interval.length != 0) {
        interval = interval[0]
        let minutes = document.querySelector(`#i${interval.id}.minutes`).value
        let seconds = document.querySelector(`#i${interval.id}.seconds`).value
        let minSecString = `${minutes}:${seconds}`
        let duration = minSecToMs(minSecString)
        interval.duration = duration
        updateTimerInfo()
    }
}