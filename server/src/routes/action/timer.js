import { Router } from "express";
import storage from "../../db";

const routes = Router();

export async function timer(userHours, userMinutes) {
    if (!Number.isInteger(userHours) || !Number.isInteger(userMinutes))
        return (("KO: Wrong date and minutes"))
    if (userHours < 0 || userHours > 24 || userMinutes < 0 || userMinutes > 59)
        return ("KO: Wrong date and minutes");
    let date = new Date(Date.now());
    let hours = date.getHours();
    let minutes = date.getMinutes();
    console.log("Test: " + hours + " : " + minutes);

    if (hours === userHours && minutes === userMinutes) {
        return ("OK: Conditions Passed");
    } else {
        return ("OK: Condition not passed");
    }
};

routes.post('/', (req, res) => {
    if (req.body === undefined) {
        res.status(400).json({ success: false, error: "No json settings given" });
        return;
    }
    if (req.body.hours == undefined || req.body.minutes == undefined) {
        res.status(400).json({ success: false, error: "Missing hours or minutes parameters" });
        return;
    }

    let action = {
        type: "timer",
        ownerId: req.token.id,
        checkInterval: 60,
        lastChecked: 0,
        linkedRea: [],
        params: {
            hours: req.body.hours,
            minutes: req.body.minutes
        }
    };

    const database = storage.get();
    const users = database.collection("actions");

    console.log("[Acti] Timer > Adding an action for user", req.token.username);
    users.insertOne(action, {}, (error, result) => {
        if (error) {
            res.status(500).json({ success: false, error: "Internal database error" });
            return;
        }
        console.log("[Acti] Timer > Added action for user", req.token.username);
        res.status(200).json({ success: true, id: result.insertedId });
        return;
    });
});

export default routes;