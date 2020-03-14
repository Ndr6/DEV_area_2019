import findService from "./findService";

export default function findReaction(name, serviceName) {
    let service = findService(serviceName);
    let reaction = undefined;

    for (let elem of service.reactions) {
        if (elem.name === name) {
            reaction = elem;
        }
    }
    return reaction;
}