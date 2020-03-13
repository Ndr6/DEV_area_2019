import sha512 from 'js-sha512';

const url = (process.env.API_URL === undefined) ? 'http://localhost:36969' : process.env.API_URL;
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
    let response = await fetch(`${url}/list`, {
        method: 'GET',
        headers: new Headers({
            'Authorization': `Bearer ${apiToken}`
        })
    });
    response = await response.json();
    console.log(response);
    return response;
}

async function connectTo(serviceName, params)
{
    let actualUrl = `${url}/service/connect`;
    let response = await fetch(actualUrl, {
        method: 'POST',
        headers: new Headers({
            'Authorization': `Bearer ${apiToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({name: serviceName, params: params}),
    });
    response = await response.json();
    return response;
}

async function getSubscribedServices() {
    let response = await fetch(`${url}/service/`, {
        method: 'GET',
        headers: new Headers({
            'Authorization': `Bearer ${apiToken}`
        })
    });
    response = await response.json();
    console.log(response);
    return response;
}

async function link(action, actionParams, reaction, reactionParams) {
    let actionRoute = `${url}/action/${action.route}`;
    let reactionRoute = `${url}/reaction/${reaction.route}`;
    let actionParamsQuery = {};
    let reactionParamsQuery = {};
    for (let param of actionParams) {
        actionParamsQuery[param.name] = param.value;
    }
    for (let param of reactionParams) {
        reactionParamsQuery[param.name] = param.value;
    }
    let response = await fetch(actionRoute, {
        method: 'POST',
        headers: new Headers({
            'Authorization': `Bearer ${apiToken}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }),
        body: JSON.stringify(actionParamsQuery)
    });
    response = await response.json();
    let actionId = response.id;
    response = await fetch(reactionRoute, {
        method: 'POST',
        headers: new Headers({
            'Authorization': `Bearer ${apiToken}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }),
        body: JSON.stringify(reactionParamsQuery)
    });
    response = await response.json();
    let reactionId = response.id;
    let linkUrl = `${url}/action/link`;
    response = await fetch(linkUrl, {
        method: 'PATCH',
        headers: new Headers({
            'Authorization': `Bearer ${apiToken}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }),
        body: JSON.stringify({actionId: actionId, reactionId: reactionId})
    })
    response = await response.json();
    return response;
}

export default {register, login, verifyToken, fetchServices, connectTo, getSubscribedServices, link};
