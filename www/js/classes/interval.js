import { Type } from './type.js'

export class Interval {
    static intervals = JSON.parse(localStorage.getItem('intervals')) || {
        timerId: 0,
        intervals: []
    }

    constructor(id, name, type, duration, repeat) {
        if (Interval.intervals.intervals.filter(i => i.id == id).length > 0) {
            throw new Error('Интервал с таким id уже существует')
        }
        if (!Type.isValid(type)) {
            throw new Error('Неизвестный тип тренировки')
        }
        if (duration < 0) {
            throw new Error('Длительность не может быть отрицательной')
        }
        if (repeat == -1) {
            throw new Error('Количество повторений не может быть отрицательным')
        }

        this.id = id
        this.name = name
        this.type = type
        this.duration = duration
        this.repeat = repeat
    }
}