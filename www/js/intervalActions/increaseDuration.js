import { Interval } from "../classes/interval.js";
import { msToMinSec } from "../utils/msToMinSec.js";
import { updateTimerInfo } from "../updateTimerInfo.js";

export function increaseDuration(id) {
    let intervals = Interval.intervals.intervals
    let intervalIndex = intervals.indexOf(
        intervals.filter(i => i.id == id)[0]
    )
    intervals[intervalIndex].duration += 1000

    let duration = intervals[intervalIndex].duration

    let minSec = msToMinSec(duration).split(':')

    document.querySelector(`#i${id}.interval .interval-bottom .interval-time .minutes`)
    .value = minSec[0]

    document.querySelector(`#i${id}.interval .interval-bottom .interval-time .seconds`)
    .value = minSec[1]

    updateTimerInfo()
}

document.querySelectorAll('.more').forEach(b => {
    b.addEventListener('click', () => increaseDuration(b.id.replace('i', '')))
})