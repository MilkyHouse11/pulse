import { Interval } from "../classes/interval.js"
import { msToMinSec } from "../utils/msToMinSec.js"
import { Type } from "../classes/type.js"
import { updateTimerInfo } from "../updateTimerInfo.js"
import { Timer } from "../classes/timer.js"
import { createTimer } from "../timerActions/createTimer.js"
import { changeType } from './changeType.js'
import { inputDuration } from "./inputDuration.js"
import { increaseDuration } from './increaseDuration.js'
import { reduceDuration } from './reduceDuration.js'
import { selectTimes } from './selectTimes.js'
import { inputName } from "./inputName.js"
import { deleteInterval } from './deleteInterval.js'
import { moveInterval } from "./moveInterval.js"
import { pushInterval } from "./pushInterval.js"

export function loadIntervals() {
    let intervals = Interval.intervals.intervals

    if (intervals.length == 0) {
        intervals.push(
            new Interval(1, 'Интервал 1', Type.WORK, 60000, 0)
        )
    }

    document.querySelector('#intervals').innerHTML = ''

    intervals.forEach(i => {
        let minSec = msToMinSec(i.duration).split(':')

        document.querySelector('#intervals').innerHTML += `
            <div class="interval" id="i${i.id}">
                <div class="interval-header">
                    <input
                        class="interval-name"
                        maxlength="20"
                        id="i${i.id}"
                        value="${i.name}"
                    >

                    <div class="interval-actions">
                        <div class="delete-interval-wrapper">
                            <button class="delete-interval" id="i${i.id}">
                                <svg
                                    width="40"
                                    height="40"
                                    viewBox="0 0 40 40"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M35 6.66663H13.3333L1.66663 20L13.3333 33.3333H35C35.884 33.3333 36.7319 32.9821 37.357 32.357C37.9821 31.7319 38.3333 30.884 38.3333 30V9.99996C38.3333 9.1159 37.9821 8.26806 37.357 7.64294C36.7319 7.01782 35.884 6.66663 35 6.66663Z"
                                        fill="var(--header)"
                                    />
                                    <path
                                        d="M30 15L20 25M20 15L30 25M35 6.66663H13.3333L1.66663 20L13.3333 33.3333H35C35.884 33.3333 36.7319 32.9821 37.357 32.357C37.9821 31.7319 38.3333 30.884 38.3333 30V9.99996C38.3333 9.1159 37.9821 8.26806 37.357 7.64294C36.7319 7.01782 35.884 6.66663 35 6.66663Z"
                                        stroke="var(--background-darker)"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="interval-bottom">
                    <div class="interval-time">
                        <button class="less" id="i${i.id}">
                            <svg
                                width="23"
                                height="9"
                                viewBox="0 0 23 9"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect
                                    x="22.982"
                                    width="8.06386"
                                    height="22.982"
                                    rx="4.03193"
                                    transform="rotate(90 22.982 0)"
                                    fill="var(--background)"
                                />
                            </svg>
                        </button>

                        <input
                            type="number"
                            class="minutes"
                            id="i${i.id}"
                            min="0"
                            value="${minSec[0]}"
                        >

                        <span>:</span>

                        <input
                            type="number"
                            class="seconds"
                            id="i${i.id}"
                            min="0"
                            maxlength="2"
                            max="59"
                            value="${minSec[1]}"
                        >

                        <button class="more" id="i${i.id}">
                            <svg
                                width="23"
                                height="23"
                                viewBox="0 0 23 23"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect
                                    x="7.4585"
                                    width="8.06386"
                                    height="22.982"
                                    rx="4.03193"
                                    fill="var(--background)"
                                />
                                <rect
                                    x="22.982"
                                    y="7.45923"
                                    width="8.06386"
                                    height="22.982"
                                    rx="4.03193"
                                    transform="rotate(90 22.982 7.45923)"
                                    fill="var(--background)"
                                />
                            </svg>
                        </button>
                    </div>

                    <div class="interval-params">
                        <div class="interval-type work">
                            <input
                                class="radio-work"
                                type="radio"
                                name="interval${i.id}-type"
                                id="interval${i.id}-work"
                                ${i.type == Type.WORK ? 'checked' : ''}
                            >

                            <label for="interval${i.id}-work">
                                <svg
                                    width="51"
                                    height="23"
                                    viewBox="0 0 51 23"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M51 16.1V6.9C51 4.75668 51 3.68501 50.6119 2.83965C50.0942 1.71253 49.1013 0.817029 47.8518 0.350152C46.9144 -4.45545e-07 45.7263 0 43.35 0C40.9737 0 39.7856 -4.45545e-07 38.8482 0.350152C37.5987 0.817029 36.6058 1.71253 36.0881 2.83965C35.7 3.68501 35.7 5.90668 35.7 8.05H15.3C15.3 5.90668 15.3 3.68501 14.9118 2.83965C14.3942 1.71253 13.4013 0.817029 12.1517 0.350152C11.2144 -4.45545e-07 10.0263 0 7.65 0C5.27371 0 4.08556 -4.45545e-07 3.14831 0.350152C1.89868 0.817029 0.905837 1.71253 0.388212 2.83965C1.13994e-07 3.68501 0 4.75668 0 6.9V16.1C0 18.2434 1.13994e-07 19.3149 0.388212 20.1604C0.905837 21.2871.89868 22.183 3.14831 22.6499C4.08556 23 5.27371 23 7.65 23C10.0263 23 11.2144 23 12.1517 22.6499C13.4013 22.183 14.3942 21.2874 14.9118 20.1604C15.3 19.3149 15.3 17.0934 15.3 14.95H35.7C35.7 17.0934 35.7 19.3149 36.0881 20.1604C36.6058 21.2874 37.5987 22.183 38.8482 22.6499C39.7856 23 40.9737 23 43.35 23C45.7263 23 46.9144 23 47.8518 22.6499C49.1013 22.183 50.0942 21.2874 50.6119 20.1604C51 19.3149 51 18.2434 51 16.1Z"
                                        fill="var(--background)"
                                    />
                                </svg>
                            </label>
                        </div>

                        <div class="interval-type rest">
                            <input
                                class="radio-rest"
                                type="radio"
                                name="interval${i.id}-type"
                                id="interval${i.id}-rest"
                                ${i.type == Type.REST ? 'checked' : ''}
                            >

                            <label for="interval${i.id}-rest">
                                <svg
                                    width="39"
                                    height="26"
                                    viewBox="0 0 39 26"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M0 11.6685C0 9.91105 1.42478 8.48621 3.18234 8.48621C4.9399 8.48621 6.36468 9.91105 6.36468 11.6685V16.9724H31.8234V11.6685C31.8234 9.91105 33.2482 8.48621 35.0057 8.48621C36.7632 8.48621 38.1881 9.91105 38.1881 11.6685V22.2763C38.1881 24.0338 36.7632 25.4587 35.0057 25.4587H3.18234C1.42478 25.4587 0 24.0338 0 22.2763V11.6685Z"
                                        fill="var(--background)"
                                    />
                                    <path
                                        d="M5.30389 3.18234C5.30389 1.42478 6.72867 0 8.48623 0H29.7018C31.4593 0 32.8842 1.42478 32.8842 3.18234V6.80601C31.0108 7.62446 29.7018 9.49355 29.7018 11.6686V14.8509H8.48623V11.6686C8.48623 9.49355 7.17713 7.62446 5.30389 6.80601V3.18234Z"
                                        fill="var(--background)"
                                    />
                                </svg>
                            </label>
                        </div>

                        <div class="repeat">
                            <select type="number" id="${i.id}" class="times">
                                <option ${i.repeat == 1 ? 'selected' : ''}>1</option>
                                <option ${i.repeat == 2 ? 'selected' : ''}>2</option>
                                <option ${i.repeat == 3 ? 'selected' : ''}>3</option>
                                <option ${i.repeat == 4 ? 'selected' : ''}>4</option>
                                <option ${i.repeat == 5 ? 'selected' : ''}>5</option>
                                <option ${i.repeat == 6 ? 'selected' : ''}>6</option>
                                <option ${i.repeat == 7 ? 'selected' : ''}>7</option>
                                <option ${i.repeat == 8 ? 'selected' : ''}>8</option>
                                <option ${i.repeat == 9 ? 'selected' : ''}>9</option>
                                <option ${i.repeat == 10 ? 'selected' : ''}>10</option>
                            </select>

                            <svg
                                width="48"
                                height="58"
                                viewBox="0 0 48 58"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M23.7156 7.3061C35.4326 7.3061 44.9312 16.9326 44.9312 28.8073C44.9312 35.9546 41.49 42.2874 36.1954 46.1969M26.2115 2.49994L21.2196 7.55905L26.2115 12.6182M23.7156 50.3085C11.9985 50.3085 2.5 40.6821 2.5 28.8073C2.5 21.66 5.94109 15.327 11.2358 11.4176M21.2196 44.9964L26.2115 50.0555L21.2196 55.1146"
                                    stroke="var(--primary)"
                                    stroke-width="5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                <div class="interval-card-bottom">
                    <div class="move-interval">
                        <svg
                            class="move-interval-icon"
                            width="32"
                            height="40"
                            viewBox="0 0 32 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M16 2L9 9H13.5V17H18.5V9H23L16 2Z"
                                fill="var(--header)"
                            />
                            <path
                                d="M16 38L23 31H18.5V23H13.5V31H9L16 38Z"
                                fill="var(--header)"
                            />
                        </svg>

                        <select class="move-select" id="i${i.id}">
                            <option selected value="">-</option>
                            <option value="up">Выше</option>
                            <option value="down">Ниже</option>
                        </select>
                    </div>

                    <div class="add-interval">
                        <svg
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect
                                x="13"
                                width="6"
                                height="32"
                                rx="3"
                                fill="var(--background)"
                            />
                            <rect
                                y="13"
                                width="32"
                                height="6"
                                rx="3"
                                fill="var(--background)"
                            />
                        </svg>

                        <select class="add-select" id="i${i.id}">
                            <option selected value="">-</option>
                            <option value="before">Добавить выше</option>
                            <option value="after">Добавить ниже</option>
                        </select>
                    </div>
                </div>
            </div>
        `
    })

    document.querySelectorAll('.delete-interval').forEach(b => {
        b.addEventListener('click', () => {
            deleteInterval(b.id.replace('i', ''))
        })
    })

    document.querySelectorAll('.more').forEach(b => {
        b.addEventListener('click', () => {
            increaseDuration(b.id.replace('i', ''))
        })
    })

    document.querySelectorAll('.less').forEach(b => {
        b.addEventListener('click', () => {
            reduceDuration(b.id.replace('i', ''))
        })
    })

    document.querySelectorAll('.radio-rest').forEach(b => {
        b.addEventListener('change', e => {
            if (e.target.checked) {
                return changeType(
                    b.id.split('-')[0].replace('interval', ''),
                    Type.REST
                )
            }
        })
    })

    document.querySelectorAll('.radio-work').forEach(b => {
        b.addEventListener('change', e => {
            if (e.target.checked) {
                return changeType(
                    b.id.split('-')[0].replace('interval', ''),
                    Type.WORK
                )
            }
        })
    })

    document.querySelectorAll('.minutes').forEach(i => {
        i.addEventListener('input', e => {
            if (e.target.value > 59) {
                e.target.value = 59
            }

            if (e.target.value < 0) {
                e.target.value = 0
            }

            return inputDuration(e.target.id.replace('i', ''))
        })
    })

    document.querySelectorAll('.seconds').forEach(i => {
        i.addEventListener('input', e => {
            if (e.target.value > 59) {
                e.target.value = 59
            }

            if (e.target.value < 0) {
                e.target.value = 0
            }

            return inputDuration(e.target.id.replace('i', ''))
        })
    })

    document.querySelectorAll('.times').forEach(b => {
        b.addEventListener('change', e => {
            return selectTimes(
                e.target.id.replace('i', ''),
                e.target.value
            )
        })
    })

    document.querySelector('#close-modal').addEventListener('click', () => {
        document.querySelector('#modal').style.display = 'none'
    })

    document.querySelector('#create-timer').addEventListener('click', () => {
        document.querySelector('#modal').style.display = 'flex'
    })

    document.querySelector('#confirm').addEventListener('click', createTimer)

    document.querySelectorAll('.interval-name').forEach(b => {
        b.addEventListener('input', e => {
            return inputName(
                e.currentTarget.id.replace('i', ''),
                e.currentTarget.value
            )
        })
    })

    document.querySelectorAll('.move-select').forEach(b => {
        b.addEventListener('change', e => {
            return moveInterval(
                e.currentTarget.id.replace('i', ''),
                e.currentTarget.value
            )
        })
    })

    document.querySelectorAll('.add-select').forEach(b => {
        b.addEventListener('change', e => {
            return pushInterval(
                e.currentTarget.id.replace('i', ''),
                e.currentTarget.value
            )
        })
    })

    if (Interval.intervals.timerId != 0) {
        let timer = Timer.timers.filter(
            t => t.id == Interval.intervals.timerId
        )

        if (timer.length > 0) {
            let title = timer[0].title

            document.querySelector('#timer-name').value = title
            document.querySelector('title').textContent = title
            document.querySelector('#title').textContent = title
        }
    }
}

loadIntervals()

document.querySelectorAll('.duration').forEach(b => {
    let mask = IMask(b, {
        mask: '00:00'
    })
})

updateTimerInfo()