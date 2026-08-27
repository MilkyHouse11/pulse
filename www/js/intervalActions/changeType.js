import { Type } from "../classes/type.js";
import { Interval } from "../classes/interval.js";

export function changeType(id, type) {
    let interval = Interval.intervals.intervals.filter(i => i.id == id)

    if (interval.length != 0) {
        interval = interval[0]
        interval.type = type
    }
}