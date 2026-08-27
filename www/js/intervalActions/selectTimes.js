import { Interval } from "../classes/interval.js";

export function selectTimes(id, times) {
    let interval = Interval.intervals.intervals.filter(i => i.id == id)

    if (interval.length != 0) {
        interval = interval[0]
        interval.repeat = times
    }
}