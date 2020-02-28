import { Router } from "express";
import storage from "../../db";
import axios from 'axios';

const routes = Router();
const baseUrl = 'https://discordapp.com/api';

export async function discordWebhook(params)
{
    const url = params.url;
    const message = params.message;

    axios.get(url)
        .then(r => {
            const webHook = r.data;
            axios.post(baseUrl + `/webhooks/${webHook.id}/${webHook.token}`, {
                content: message,
            }).then(r => console.log(r.data))
        });
}

routes.post('/', (req, res) => {
    if (req.body === undefined) {
        res.status(400).json({ success: false, error: "No json settings given" });
        return;
    }
    if (req.body.url == undefined || req.body.message == undefined) {
        res.status(400).json({ success: false, error: "Missing reaction parameter" });
        return;
    }

    let reaction = {
        actionType: "discord",
        ownerId: req.token.id,
        lastTrigger: 0,
        actionParams: {
            url: req.body.url,
            message: req.body.message
        }
    };

    const database = storage.get();
    const reactions = database.collection("reactions");

    console.log("[Reac] Discord > Adding a reaction for user", req.token.username);
    reactions.insertOne(reaction, {}, (error, result) => {
        if (error) {
            res.status(500).json({ success: false, error: "Internal database error" });
            return;
        }
        console.log("[Reac] Discord > Added reaction for user", req.token.username);
        res.status(200).json({ success: true, id: result.insertedId });
        return;
    });
});

export default routes;