import { Router } from "express";
import storage from "../../db";

const routes = Router();

export async function log(reaction, user, actionMessage)
{
    console.log(actionMessage);
    return { success: true, params: reaction.params};
};

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
        type: "log",
        ownerId: req.token.id,
        lastTrigger: 0,
        params: {
        }
    };

    const database = storage.get();
    const reactions = database.collection("reactions");

    console.log("[Reac] Console Log > Adding a reaction for user", req.token.username);
    reactions.insertOne(reaction, {}, (error, result) => {
        if (error) {
            res.status(500).json({ success: false, error: "Internal database error" });
            return;
        }
        console.log("[Reac] Console Log > Added reaction for user", req.token.username);
        res.status(200).json({ success: true, id: result.insertedId });
        return;
    });
});

export default routes;