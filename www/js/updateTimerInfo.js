import {getPluralString} from './utils/getPluralString.js'
import { Interval } from './classes/interval.js'
import { msToMinSec } from './utils/msToMinSec.js'

export function updateTimerInfo() {
    if (Interval.intervals.intervals.length > 0) {
        let durationSum = Interval.intervals.intervals.reduce((sum, i) =>
            sum + i.duration, 0)
        document.querySelector('#timer-info').textContent = 
        `${Interval.intervals.intervals.length} ${getPluralString(Interval.intervals.intervals.length)} • ${msToMinSec(durationSum)}`
    }
}