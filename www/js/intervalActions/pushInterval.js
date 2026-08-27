import { Interval } from "../classes/interval.js"
import { loadIntervals } from "./loadIntervals.js"
import { Type } from "../classes/type.js"

export function pushInterval(id, action) {
    let intervals = Interval.intervals.intervals

    let maxId = 1

    if (Interval.intervals.intervals.length > 0) {
        maxId = Interval.intervals.intervals.reduce((max, current) =>
            current.id > max.id ? current : max
        ).id
    }

    let newId = maxId + 1

    let interval = intervals.filter(i => i.id == id)

    if (interval.length == 0) {
        return
    }

    interval = interval[0]
    let intervalIndex = intervals.indexOf(interval)

    if (!['before', 'after'].includes(action)) {
        return
    }

    if (action == 'before') {
        if (intervalIndex > 0) {
            intervals.splice(intervalIndex, 0, new Interval(newId, `Интервал ${newId}`, Type.WORK, 60000, 0))
        }
    }
    else if (action == 'after') {
        if (intervalIndex < intervals.length - 1) {
            intervals.splice(intervalIndex + 1, 0, new Interval(newId, `Интервал ${newId}`, Type.WORK, 60000, 0))
        }
    }

    loadIntervals()
}