import { apiRequest } from './utils/apiRequest.js'

const errorMessage = document.getElementById('error-message');
const params = new URLSearchParams(window.location.search);

async function login(e) {
    e.preventDefault();

    errorMessage.style.display = 'none';

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        let response = await fetch('http://localhost:3000/api/accounts/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }
        )

        let data = await response.json();

        if (response.ok && data['access'] && data['refresh']) {
            localStorage.setItem('access', data['access'])
            localStorage.setItem('refresh', data['refresh'])

            response = await apiRequest('timers/')

            data = await response.json()

            localStorage.setItem('timers', JSON.stringify(data))

            window.location.href = 'main.html'
        }
        else {
            errorMessage.textContent = 'Ошибка авторизации'
            errorMessage.style.display = 'block';
        }
    }
    catch (error) {
        errorMessage.textContent = 'Ошибка соединения с сервером';
        errorMessage.style.display = 'block';
        console.log(error)
    }
}

document.querySelector('form').addEventListener('submit', (e) => {
    return login(e)
})