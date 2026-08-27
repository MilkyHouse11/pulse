import { apiRequest } from "./apiRequest.js"
import { Timer } from '../classes/timer.js'

export async function checkAuth() {
    if (localStorage.getItem('refresh')) {
        try {
            let response = await apiRequest('timers/')
            if (response.status == 200) {
                let timers = Timer.timers.map(({ id, ...rest }) => rest)
                timers.forEach(t => {
                    t.intervals = t.intervals.map(({ id, ...rest }) => rest)
                })
                response = await apiRequest('timers/set/', {
                    method: 'POST',
                    body: JSON.stringify(timers)
                })
            }
        }
        catch (e) {
        }
    }
}