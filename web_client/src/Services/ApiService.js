import sha512 from 'js-sha512';

const url = process.env.API_URL || 'http://localhost:36969';

async function register(username, password) {
    password = sha512(password);
    let response = await fetch(`${url}/auth/signup?username=${username}&password=${password}`, {
        method: 'POST',
    });
    response = await response.json();
    return response;
}

async function login(username, password) {
    password = sha512(password);
    let response = await fetch(`${url}/auth/signin?username=${username}&password=${password}`, {
        method: 'POST',
    });
    response = await response.json();
    return response;
}

async function verifyToken(token) {
    let response = await fetch(`${url}/auth/verify?token=${token}`, {
        method: 'GET',
    });
    response = await response.json();
    return response;
}

export default {register, login, verifyToken};