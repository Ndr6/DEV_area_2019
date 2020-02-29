import { Router } from "express";
import storage from "../../db";
import pornnhub from 'pornnhub';

const routes = Router();

export async function pornhubViewCounter(action, user) {
    if (!Number.isInteger(action.params.viewIdx) || !Number.isInteger(action.params.lastViewIdx)) {
        return undefined;
    }
    return (pornnhub(action.params.url, 'views').then(response => {
        if (parseInt(response.data) + action.params.viewIdx >= action.params.lastViewIdx) {
            action.params.lastViewIdx = parseInt(response.data);
            return { success: true, params: action.params, message: "The video " + action.params.url + " as reached " + response.data };
        } else {
            return { success: false, params: action.params};
        }
    }).catch(error => {
        console.log(error.data);
        return { success: false, params: action.params};
    }))
};

//TODO SUB
routes.post('/', (req, res) => {
    if (req.body === undefined) {
        res.status(400).json({ success: false, error: "No json settings given" });
        return;
    }
    if (req.body.url == undefined) {
        res.status(400).json({ success: false, error: "Missing URL parameter" });
        return;
    }
    if (req.body.checkInterval == undefined || req.body.checkInterval < 60)
        req.body.checkInterval = 600;

    let action = {
        actionType: "pornhub",
        ownerId: req.token.id,
        checkInterval: req.body.checkInterval,
        lastChecked: 0,
        linkedRea: [],
        params: {
            url: req.body.url,
            viewIdx: req.body.viewIdx,
            lastViewIdx: req.body.lastViewIdx
        }
    };

    const database = storage.get();
    const users = database.collection("actions");

    console.log("[Acti] RSS > Adding an action for user", req.token.username);
    users.insertOne(action, {}, (error, result) => {
        if (error) {
            res.status(500).json({ success: false, error: "Internal database error" });
            return;
        }
        console.log(result);
        console.log("[Acti] RSS > Added action for user", req.token.username);
        res.status(200).json({ success: true, id: result.insertedId });
        return;
    });
});

export default routes;