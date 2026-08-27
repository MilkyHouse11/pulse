import { Interval } from "../classes/interval.js"

export function inputName(id, name) {
    let interval = Interval.intervals.intervals.filter(i => i.id == id)

    if (interval.length > 0) {
        interval = interval[0]

        if (name.trim().length > 0) {
            interval.name = name
        }
    }
}