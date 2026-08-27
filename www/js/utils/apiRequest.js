export async function apiRequest(endpoint, options = {}) {
    let access = localStorage.getItem('access');
    let refresh = localStorage.getItem('refresh');

    let response = await fetch(`http://localhost:3000/api/${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(access && { 'Authorization': `Bearer ${access}` }),
            ...options.headers,
        },
    });

    if (response.status === 401) {
        try {
            response = await fetch('http://localhost:3000/api/accounts/token/refresh/', {
                method: 'POST',
                body: JSON.stringify({
                    refresh: refresh
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            )
            if (response.ok) {
                let data = await response.json()

                localStorage.setItem('access', data['access']);
                localStorage.setItem('refresh', data['refresh']);

                access = localStorage.getItem('access');
                refresh = localStorage.getItem('refresh');

                response = await fetch(`http://localhost:3000/api/${endpoint}`, {
                    ...options,
                    headers: {
                        'Content-Type': 'application/json',
                        ...(access && { 'Authorization': `Bearer ${access}` }),
                        ...options.headers,
                    },
                });
            }
            else {
                localStorage.removeItem('access');
                localStorage.removeItem('refresh');
                window.location.href = 'auth.html';
            }
        }
        catch (e) {
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            window.location.href = 'auth.html';
        }
    }

    return response;
}