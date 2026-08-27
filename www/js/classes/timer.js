import { msToMinSec } from '../utils/msToMinSec.js'
import { Type } from './type.js'
import { Feedback } from './feedback.js'
import { KeepAwake } from './keepAwake.js'
import { BackgroundService } from './backgroundService.js'

export class Timer {

    static timers = JSON.parse(localStorage.getItem('timers')) || []

    static currentIndex = 0

    static isPaused = false

    static timerId = localStorage.getItem('timerId')

    static timer = this.timers.filter(t => t.id == this.timerId)

    static repeat = 0

    static currentInterval = null

    static intervalEndTime = 0

    static pausedIntervalTime = 0

    static pausedTotalTime = 0

    static uiInterval = null

    static loadCurrentInterval() {

        if (this.timer.length === 0) {
            return
        }

        const interval =
            this.timer[0].intervals[this.currentIndex]

        this.repeat = interval.repeat
        this.currentInterval = interval
    }

    static getRemainingIntervalTime() {

        if (this.isPaused) {
            return this.pausedIntervalTime
        }

        if (this.intervalEndTime === 0) {
            return 0
        }

        return Math.max(
            0,
            this.intervalEndTime - Date.now()
        )
    }

    static getRemainingTotalTime() {

        if (this.isPaused) {
            return this.pausedTotalTime
        }

        if (!this.currentInterval || this.intervalEndTime === 0) {
            return 0
        }

        const now = Date.now()

        let total =
            Math.max(
                0,
                this.intervalEndTime - now
            )

        const completedRepeats =
            this.currentInterval.repeat - this.repeat

        const remainingRepeats =
            Math.max(
                0,
                this.currentInterval.repeat -
                completedRepeats -
                1
            )

        total +=
            this.currentInterval.duration *
            remainingRepeats

        for (
            let i = this.currentIndex + 1;
            i < this.timer[0].intervals.length;
            i++
        ) {

            const interval =
                this.timer[0].intervals[i]

            total +=
                interval.duration *
                interval.repeat
        }

        return Math.max(0, total)
    }

    static updateUI() {

        if (!this.currentInterval) {
            return
        }

        document.querySelector('#total-time').textContent =
            msToMinSec(
                this.getRemainingTotalTime()
            )

        document.querySelector('#interval-time').textContent =
            msToMinSec(
                this.getRemainingIntervalTime()
            )

        document.querySelector('#interval-name').textContent =
            this.currentInterval.name

        document.querySelector('#interval-type').textContent =
            this.currentInterval.type == Type.WORK
                ? 'Работа'
                : 'Отдых'

        document.documentElement.style.setProperty(
            '--timer-background',
            this.currentInterval.type == Type.WORK
                ? 'var(--primary)'
                : 'var(--background)'
        )

        document.documentElement.style.setProperty(
            '--timer-primary',
            this.currentInterval.type == Type.WORK
                ? 'var(--background)'
                : 'var(--primary)'
        )
    }

    static async updateBackgroundNotification() {

        if (!this.currentInterval || this.isPaused) {
            return
        }

        await BackgroundService.update({
            title: this.currentInterval.name,
            body: msToMinSec(
                this.getRemainingIntervalTime()
            )
        })
    }

    static startInterval(endTime = Date.now()) {

        this.intervalEndTime =
            endTime +
            this.currentInterval.duration
    }

    static async updateTimer() {

        if (!this.currentInterval) {
            return
        }

        if (this.isPaused) {
            this.updateUI()
            return
        }

        const now = Date.now()

        if (now >= this.intervalEndTime) {
            await this.finishInterval(now)
            return
        }

        if ((this.intervalEndTime - now) / 1000 < 3) {
            Feedback.tick()
        }

        this.updateUI()

        await this.updateBackgroundNotification()
    }

    static async finishInterval(now = Date.now()) {

        this.repeat--

        if (this.repeat > 0) {

            this.intervalEndTime +=
                this.currentInterval.duration

            if (this.intervalEndTime > now) {

                this.updateUI()

                Feedback.repeat()

                await this.updateBackgroundNotification()

                return
            }

            await this.finishInterval(now)

            return
        }

        if (
            this.currentIndex >=
            this.timer[0].intervals.length - 1
        ) {

            this.intervalEndTime = 0

            this.stopUIUpdate()

            await KeepAwake.disable()
            await BackgroundService.stop()

            document.querySelector('#repeat').style.display =
                'block'

            document.querySelector('#pause').style.display =
                'none'

            document.querySelector('#total-time').textContent =
                '00:00'

            document.querySelector('#interval-time').textContent =
                '00:00'

            Feedback.endTimer()

            return
        }

        this.currentIndex++

        this.loadCurrentInterval()

        this.intervalEndTime +=
            this.currentInterval.duration

        Feedback.endInterval()

        if (this.intervalEndTime > now) {

            this.updateUI()

            await this.updateBackgroundNotification()

            return
        }

        await this.finishInterval(now)
    }

    static startUIUpdate() {

        this.stopUIUpdate()

        this.uiInterval = setInterval(
            async () => {
                await this.updateTimer()
            },
            1000
        )
    }

    static stopUIUpdate() {

        if (this.uiInterval !== null) {

            clearInterval(this.uiInterval)

            this.uiInterval = null
        }
    }

    static async pauseTimer() {

        if (this.isPaused) {
            return
        }

        this.pausedIntervalTime =
            this.getRemainingIntervalTime()

        this.pausedTotalTime =
            this.getRemainingTotalTime()

        this.isPaused = true

        document.querySelector('#pause').innerHTML = `<svg width="99" height="111" viewBox="0 0 99 111" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M93.75 46.8209C100.417 50.67 100.417 60.2925 93.75 64.1415L15 109.608C8.33332 113.457 -5.49296e-06 108.646 -5.15647e-06 100.948L-1.18168e-06 10.0149C-8.45188e-07 2.31685 8.33333 -2.49439 15 1.35461L93.75 46.8209Z" fill="var(--timer-primary)"/>
</svg>
`

        await KeepAwake.disable()
        await BackgroundService.stop()

        this.updateUI()
    }

    static async resumeTimer() {

        if (!this.isPaused) {
            return
        }

        const now = Date.now()

        this.intervalEndTime =
            now + this.pausedIntervalTime

        this.isPaused = false

        document.querySelector('#pause').innerHTML = `
        <svg width="70" height="108" viewBox="0 0 70 108" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="70" y="108" width="15" height="108" rx="7.5" transform="rotate(-180 70 108)"
                    fill="var(--timer-primary)" />
                <rect x="15" y="108" width="15" height="108" rx="7.5" transform="rotate(-180 15 108)"
                    fill="var(--timer-primary)" />
            </svg>`

        await KeepAwake.enable()

        await BackgroundService.start({
            title: this.currentInterval.name,
            body: msToMinSec(
                this.getRemainingIntervalTime()
            )
        })

        this.updateUI()
    }

    static async nextInterval() {

        if (
            this.currentIndex >=
            this.timer[0].intervals.length - 1
        ) {
            return
        }

        this.currentIndex++

        this.loadCurrentInterval()

        const now = Date.now()

        if (this.isPaused) {
            this.pausedIntervalTime = this.currentInterval.duration
            this.pausedTotalTime =
                this.calculatePausedTotalTime()
        }

        this.startInterval(now)

        this.updateUI()

        await this.updateBackgroundNotification()
    }

    static calculatePausedTotalTime() {

        let total =
            this.currentInterval.duration * this.currentInterval.repeat

        for (
            let i = this.currentIndex + 1;
            i < this.timer[0].intervals.length;
            i++
        ) {

            const interval =
                this.timer[0].intervals[i]

            total +=
                interval.duration *
                interval.repeat

        }

        return total
    }

    static async previousInterval() {

        if (this.currentIndex <= 0) {
            return
        }

        this.currentIndex--

        this.loadCurrentInterval()

        const now = Date.now()

        if (this.isPaused) {
            this.pausedIntervalTime = this.currentInterval.duration
            this.pausedTotalTime =
                this.calculatePausedTotalTime()
        }

        this.startInterval(now)

        this.updateUI()

        await this.updateBackgroundNotification()
    }

    static async restartTimer() {

        await KeepAwake.enable()

        this.stopUIUpdate()

        this.currentIndex = 0

        this.isPaused = false

        this.loadCurrentInterval()

        this.startInterval()

        await BackgroundService.start({
            title: this.currentInterval.name,
            body: msToMinSec(
                this.getRemainingIntervalTime()
            )
        })

        document.querySelector('#pause').style.display =
            'block'

        document.querySelector('#repeat').style.display =
            'none'

        this.startUIUpdate()

        this.updateUI()
    }

    static async runTimer() {

        if (this.timer.length === 0) {
            return
        }

        this.loadCurrentInterval()

        this.startInterval()

        await BackgroundService.start({
            title: this.currentInterval.name,
            body: msToMinSec(
                this.getRemainingIntervalTime()
            )
        })

        await KeepAwake.enable()

        document.querySelector('#next').addEventListener(
            'click',
            async () => {
                await this.nextInterval()
            }
        )

        document.querySelector('#previous').addEventListener(
            'click',
            async () => {
                await this.previousInterval()
            }
        )

        document.querySelector('#pause').addEventListener(
            'click',
            async e => {

                if (this.isPaused) {
                    await this.resumeTimer()
                } else {
                    await this.pauseTimer()
                }

                e.currentTarget.innerHTML = this.isPaused
                    ? `
                        <svg
                            width="99"
                            height="111"
                            viewBox="0 0 99 111"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M93.75 46.8209C100.417 50.67 100.417 60.2925 93.75 64.1415L15 109.608C8.33332 113.457 -5.49296e-06 108.646 -5.15647e-06 100.948L-1.18168e-06 10.0149C-8.45188e-07 2.31685 8.33333 -2.49439e-06 15 1.35461L93.75 46.8209Z"
                                fill="var(--timer-primary)"
                            />
                        </svg>
                    `
                    : `
                        <svg
                            width="70"
                            height="108"
                            viewBox="0 0 70 108"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect
                                x="70"
                                y="108"
                                width="15"
                                height="108"
                                rx="7.5"
                                transform="rotate(-180 70 108)"
                                fill="var(--timer-primary)"
                            />
                            <rect
                                x="15"
                                y="108"
                                width="15"
                                height="108"
                                rx="7.5"
                                transform="rotate(-180 15 108)"
                                fill="var(--timer-primary)"
                            />
                        </svg>
                    `
            }
        )

        document.querySelector('#repeat').addEventListener(
            'click',
            async () => {
                await this.restartTimer()
            }
        )

        Feedback.startTimer()

        this.startUIUpdate()

        this.updateUI()
    }
}