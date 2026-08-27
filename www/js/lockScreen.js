function lockScreen() {

    const lock = document.querySelector('#lock')
    const lockScreenButton = document.querySelector('#lock-screen')
    const shackle = document.querySelector('#lock-shackle')

    if (lock.style.zIndex == 9999) {

        shackle.classList.remove('close')
        shackle.classList.add('open')

        lock.style.zIndex = 0
        lock.style.pointerEvents = 'none'

        lockScreenButton.style.zIndex = 0

    } else {

        shackle.classList.remove('open')
        shackle.classList.add('close')

        lock.style.zIndex = 9999
        lock.style.pointerEvents = 'auto'

        lockScreenButton.style.zIndex = 10000

    }

}

document
    .querySelector('#lock-screen')
    .addEventListener('click', lockScreen)