export const URL_API = "http://192.168.3.171:8000"

export async function login(correo, clave) {
    const response = await fetch(`${URL_API}/cuentas/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo, clave }),
    });
    return response.json();
}

export async function register(data) {
    const response = await fetch(`${URL_API}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response.json();
}

export async function GET(recurso, token = ''){
    const response = await fetch(`${URL_API}/${recurso}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Bearer': token,
        },
    });
    return response.json();
}

export async function POST(recurso, token = '', data){
    const response = await fetch(`${URL_API}/${recurso}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Bearer': token,
        },
        body: JSON.stringify(data),
    });
    return response.json();
}

export async function PUT(recurso, token = '', data){
    const response = await fetch(`${URL_API}/${recurso}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Bearer': token,
        },
        body: JSON.stringify(data),
    });
    return response.json();
}

export async function DELETE(recurso, token = ''){
    const response = await fetch(`${URL_API}/${recurso}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Bearer': token,
        },
    });
    return response.json();
}

export async function verify_jwt(token){
    const response = await fetch(`${URL_API}/verify?token=${token}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    return response.json();
}