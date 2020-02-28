import sha512 from 'js-sha512';

const url = process.env.API_URL || 'http://localhost:36969';
var apiToken = undefined;

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
    apiToken = token;
    let response = await fetch(`${url}/auth/verify?token=${token}`, {
        method: 'GET',
    });
    response = await response.json();
    return response;
}

async function fetchServices() {
    let response = await fetch(`${url}/services/list`, {
        method: 'GET',
        headers: new Headers({
            'Authorization': `Bearer ${apiToken}`
        })
    });
    response = await response.json();
    return response;
}

async function connectTo(serviceName, params)
{
    let actualUrl = `${url}/services/${serviceName}/connect`;
    let first = true;
    for (let param of params) {
        if (first) {
            actualUrl = actualUrl.concat(`?${param.name}=${param.value}`);
            first = false;
        } else {
            actualUrl = actualUrl.concat(`&${param.name}=${param.value}`);
        }
    }
    console.log('URL ' + actualUrl)
    let response = await fetch(actualUrl, {
        method: 'POST',
        headers: new Headers({
            'Authorization': `Bearer ${apiToken}`
        })
    });
    response = await response.json();
    return response;
}

export default {register, login, verifyToken, fetchServices, connectTo};
