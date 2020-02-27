import { Router } from "express";
import storage from "../../db";
import parser from "rss-parser";

let Parser = new parser();
const routes = Router();

routes.delete('/reaction/:name/', (req, res) => {
    if (req.body === undefined) {
        res.status(400).json({ success: false, error: "No json settings given" });
        return;
    }
    if (req.body.id == undefined) {
        res.status(400).json({ success: false, error: "Missing URL parameter" });
        return;
    }

    const database = storage.get();
    const users = database.collection("reactions");

    console.log("[Reac] Generic > Trying to delete a reaction for user", req.token.username);
    users.findOne({ _id: storage.convert_mongo_id(req.body.id) }, {}, (error, result) => {
        if (error || result == null) {
            console.log("[Reac] Generic > Reaction not found for user", req.token.username);
            res.status(404).json({ success: false, error: "Reaction not found" });
            return;
        }
        if (result.ownerId != req.token.id) {
            console.log("[Reac] Generic > Trying to delete a reaction owned by another user from ", req.token.username);
            res.status(403).json({ success: false, error: "This reaction is not owned by the requesting user" });
            return;
        }
        console.log("[Reac] Generic > Deleting reaction for user", req.token.username);
        users.deleteOne({ _id: storage.convert_mongo_id(req.body.id) }, {}, (error, result) => {
            if (error || result == null) {
                console.log("[Reac] Generic > Error on reaction deletion for user", req.token.username);
                res.status(500).json({ success: false, error: "Internal database error" });
                return;
            }
            console.log("[Reac] Generic > Deleted reaction for user", req.token.username);
            res.status(200).json({ success: true, id: req.body.id });
        });
    });
});

export default routes;