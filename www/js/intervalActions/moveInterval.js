import { Interval } from "../classes/interval.js"
import { loadIntervals } from "./loadIntervals.js"

export function moveInterval(id, action) {
    if (!['up', 'down'].includes(action)) {
        return
    }

    let intervals = Interval.intervals.intervals
    let interval = intervals.filter(i => i.id == id)

    if (interval.length != 0) {
        let intervalIndex = intervals.indexOf(interval[0])

        if (action == 'up') {
            if (intervalIndex != 0) {
                [intervals[intervalIndex - 1], intervals[intervalIndex]] = [intervals[intervalIndex], intervals[intervalIndex - 1]]
            }
        }
        else if (action == 'down') {
            if (intervalIndex != intervals.length - 1) {
                [intervals[intervalIndex], intervals[intervalIndex + 1]] = [intervals[intervalIndex + 1], intervals[intervalIndex]]
            }
        }

        console.log(`INTERVALS ${intervals[0].name}`)

        loadIntervals()
    }
}