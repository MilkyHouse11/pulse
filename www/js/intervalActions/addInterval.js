import { Interval } from "../classes/interval.js"
import { Type } from "../classes/type.js"
import { loadIntervals } from "../intervalActions/loadIntervals.js"
import { updateTimerInfo } from "../updateTimerInfo.js"

function addInterval() {
    let maxId = 1

    if (Interval.intervals.intervals.length > 0) {
        maxId = Interval.intervals.intervals.reduce((max, current) =>
            current.id > max.id ? current : max
        ).id
    }

    let newId = maxId + 1

    Interval.intervals.intervals.push(new Interval(newId, `Интервал ${newId}`, Type.WORK, 60000, 0))
    
    loadIntervals()
    document.querySelector(`#i${newId}`).classList.add('added')
    updateTimerInfo()
}

document.querySelector('#add-interval').addEventListener('click', addInterval)