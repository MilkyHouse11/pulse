import { Interval } from "../classes/interval.js";
import { msToMinSec } from "../utils/msToMinSec.js";
import { updateTimerInfo } from "../updateTimerInfo.js";

export function reduceDuration(id) {
    let intervalIndex = Interval.intervals.intervals.indexOf(
        Interval.intervals.intervals.filter(i => i.id == id)[0]
    )
    
    if (Interval.intervals.intervals[intervalIndex].duration != 0)
        Interval.intervals.intervals[intervalIndex].duration -= 1000
    
    let duration = Interval.intervals.intervals[intervalIndex].duration

    let minSec = msToMinSec(duration).split(':')

    document.querySelector(`#i${id}.interval .interval-bottom .interval-time .minutes`)
    .value = minSec[0]

    document.querySelector(`#i${id}.interval .interval-bottom .interval-time .seconds`)
    .value = minSec[1]

    updateTimerInfo()
}

document.querySelectorAll('.less').forEach(b => {
    b.addEventListener('click', () => reduceDuration(b.id.replace('i', '')))
})