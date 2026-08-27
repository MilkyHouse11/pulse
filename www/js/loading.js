document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('svg').classList.add('img-pulse')
    setTimeout(() => {
        document.querySelector('svg').classList.remove('img-pulse')
        document.querySelector('p').classList.add('slide-right')
        document.querySelector('svg').classList.add('slide-left')
    }, 1000);
    setTimeout(() => {
        if (localStorage.getItem('guest') || localStorage.getItem('refresh')) {
            window.location.href = 'html/main.html'    
            return
        }
        window.location.href = 'html/register.html'
    }, 1500);
})