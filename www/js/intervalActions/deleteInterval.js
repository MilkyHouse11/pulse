import { Interval } from "../classes/interval.js"
import { loadIntervals } from "./loadIntervals.js"
import { updateTimerInfo } from "../updateTimerInfo.js"

export function deleteInterval(id) {
    if (Interval.intervals.intervals.length == 1) {
        return;
    }
    document.querySelector(`#i${id}`).classList.add('deleted')
    setTimeout(() => {
        Interval.intervals.intervals = Interval.intervals.intervals.filter(i => i.id != id)
        
        loadIntervals()
        updateTimerInfo()
    }, 500);
}