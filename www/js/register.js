const errorMessage = document.getElementById('error-message');

async function register(e) {
    e.preventDefault();

    errorMessage.style.display = 'none';

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        errorMessage.textContent = 'Пароли не совпадают';
        errorMessage.style.display = 'block';
        return;
    }

    if (password.length < 6) {
        errorMessage.textContent = 'Пароль должен содержать минимум 6 символов';
        errorMessage.style.display = 'block';
        return;
    }

    try {
        let response = await fetch('http://localhost:3000/api/accounts/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        let data = await response.json();

        if (response.ok) {
            response = await fetch('http://localhost:3000/api/accounts/token/', {
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
            
            data = await response.json();

            if (response.ok && data['access'] && data['refresh']) {
                localStorage.setItem('access', data['access'])
                localStorage.setItem('refresh', data['refresh'])
            }
            else {
                errorMessage.textContent = 'Ошибка регистрации'
                errorMessage.style.display = 'block';
            }

            window.location.href = 'main.html';
        } else {
            if (data['email']) {
                errorMessage.textContent = 'Пользователь с таким email уже существует'
            }
            else {
                errorMessage.textContent = 'Ошибка регистрации'
            }
            errorMessage.style.display = 'block';
        }
    } catch (error) {
        errorMessage.textContent = 'Ошибка соединения с сервером';
        errorMessage.style.display = 'block';
    }
};

document.querySelector('form').addEventListener('submit', (e) => {
    return register(e)
})