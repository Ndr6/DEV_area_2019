import findService from "./findService";

export default function findAction(name, serviceName) {
    let service = findService(serviceName);
    let action = undefined;

    for (let elem of service.actions) {
        if (elem.name === name) {
            action = elem;
        }
    }
    return action;
}