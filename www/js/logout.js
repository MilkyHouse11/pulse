function logout() {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    try {
        fetch('http://localhost:3000/api/accounts/token/blacklist/', {
            method: 'POST',
            body: JSON.stringify({
                refresh: localStorage.getItem('refresh'),
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }
    catch {}
    window.location.href = '../html/login.html';
}

document.querySelector('#logout').addEventListener('click', logout)