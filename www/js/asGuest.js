function asGuest() {
    localStorage.setItem('guest', true)
}

document.querySelector('#guest').addEventListener('click', asGuest)