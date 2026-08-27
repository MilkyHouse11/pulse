export function redirectToTimerPage(timerId) {
    localStorage.setItem('timerId', timerId)
    window.location.href = '../html/timer.html'
}