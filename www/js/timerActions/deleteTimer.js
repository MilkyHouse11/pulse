import { Timer } from '../classes/timer.js'
import { loadTimers } from './loadTimers.js'

export function deleteTimer(id) {
    let timer = Timer.timers.filter(t => t.id == id)

    if (timer.length != 0) {
        document.querySelector(`#t${id}`).classList.add('deleted')

        setTimeout(() => {
            Timer.timers = Timer.timers.filter(t => t.id != id)
    
            localStorage.setItem('timers', JSON.stringify(Timer.timers))
    
            loadTimers()
        }, 500);
    }
}