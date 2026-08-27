import { getPluralString } from "../utils/getPluralString.js"
import { msToMinSec } from "../utils/msToMinSec.js"
import { Type } from "../classes/type.js"
import { Timer } from "../classes/timer.js"
import { deleteTimer } from "./deleteTimer.js"
import { editTimer } from "./editTimer.js"
import { redirectToTimerPage } from "./redirectToTimerPage.js"
import { checkAuth } from "../utils/checkAuth.js"

export function loadTimers() {
    localStorage.removeItem('intervals')
    localStorage.removeItem('timerId')
    document.querySelector("#timers").innerHTML = ''

    if (Timer.timers.length == 0) {
        document.querySelector('#empty').style.display = 'flex'
        return
    }

    Timer.timers.forEach(timer => {
        let workTime = msToMinSec(timer.intervals.filter(
            interval => interval.type == Type.WORK
        ).reduce((acc, i) => acc + i.duration, 0))

        let restTime = msToMinSec(timer.intervals.filter(
            interval => interval.type == Type.REST
        ).reduce((acc, i) => acc + i.duration, 0))

        let totalTime = msToMinSec(timer.intervals.reduce((acc, i) => acc + i.duration * i.repeat, 0))

        document.querySelector("#timers").innerHTML += `
            <div class="timer" id="t${timer.id}">
            <div class="timer-header">
                <p class="timer-title">
                    ${timer.title}
                </p>
                <div class="timer-actions">
                    <button href="" class="edit-timer" id="t${timer.id}">
                        <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M27.625 4.875C28.0518 4.44821 28.5585 4.10965 29.1161 3.87867C29.6737 3.64769 30.2714 3.52881 30.875 3.52881C31.4786 3.52881 32.0762 3.64769 32.6339 3.87867C33.1915 4.10965 33.6982 4.44821 34.125 4.875C34.5518 5.3018 34.8903 5.80848 35.1213 6.36612C35.3523 6.92375 35.4712 7.52142 35.4712 8.125C35.4712 8.72858 35.3523 9.32625 35.1213 9.88389C34.8903 10.4415 34.5518 10.9482 34.125 11.375L12.1875 33.3125L3.25 35.75L5.6875 26.8125L27.625 4.875Z" fill="var(--background-darker)"/>
                        </svg>

                    </button>
                    <button class="delete-timer" id="t${timer.id}">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M35 6.66663H13.3333L1.66663 20L13.3333 33.3333H35C35.884 33.3333 36.7319 32.9821 37.357 32.357C37.9821 31.7319 38.3333 30.884 38.3333 30V9.99996C38.3333 9.1159 37.9821 8.26806 37.357 7.64294C36.7319 7.01782 35.884 6.66663 35 6.66663Z" fill="var(--header)"/>
                            <path d="M30 15L20 25M20 15L30 25M35 6.66663H13.3333L1.66663 20L13.3333 33.3333H35C35.884 33.3333 36.7319 32.9821 37.357 32.357C37.9821 31.7319 38.3333 30.884 38.3333 30V9.99996C38.3333 9.1159 37.9821 8.26806 37.357 7.64294C36.7319 7.01782 35.884 6.66663 35 6.66663Z" stroke="var(--surface)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>

                    </button>
                </div>
            </div>
            <div class="timer-main">
                <p class="timer-work-time">
                    Работа: ${workTime}
                </p>
                <p class="timer-rest-time">
                    Отдых: ${restTime}
                </p>
            </div>
            <div class="timer-footer">
                <p class="timer-info">
                    ${timer.intervals.length} ${getPluralString(timer.intervals.length)} • ${totalTime}
                </p>
                <a class="run-timer" id="t${timer.id}">
                    <svg width="29" height="31" viewBox="0 0 29 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24 6.55081C30.6667 10.3998 30.6667 20.0223 24 23.8713L15 29.0675C8.33333 32.9165 -1.70012e-06 28.1052 -1.36363e-06 20.4072L-9.09365e-07 10.0149C-5.72874e-07 2.3169 8.33333 -2.49435 15 1.35465L24 6.55081Z" fill="var(--surface)"/>
                    </svg>

                </a>
            </div>
        </div>
        `
    })

    document.querySelectorAll('.delete-timer').forEach(b => {
        b.addEventListener('click', e => {
            return deleteTimer(e.currentTarget.id.replace('t', ''))
        })
    })

    document.querySelectorAll('.edit-timer').forEach(b => {
        b.addEventListener('click', e => {
            return editTimer(e.currentTarget.id.replace('t', ''))
        })
    })

    document.querySelectorAll('.run-timer').forEach(b => {
        b.addEventListener('click', e => {
            return redirectToTimerPage(e.currentTarget.id.replace('t', ''))
        })
    })

    checkAuth()
}

document.addEventListener("DOMContentLoaded", () => {
    loadTimers()
})