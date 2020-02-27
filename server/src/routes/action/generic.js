import { Router } from "express";
import storage from "../../db";
import parser from "rss-parser";

let Parser = new parser();
const routes = Router();

routes.delete('/action/:name/', (req, res) => {
    if (req.body === undefined) {
        res.status(400).json({ success: false, error: "No json settings given" });
        return;
    }
    if (req.body.id == undefined) {
        res.status(400).json({ success: false, error: "Missing URL parameter" });
        return;
    }

    const database = storage.get();
    const users = database.collection("actions");

    console.log("[Acti] Generic > Trying to delete an action for user", req.token.username);
    users.findOne({ _id: storage.convert_mongo_id(req.body.id) }, {}, (error, result) => {
        if (error || result == null) {
            console.log("[Acti] Generic > Action not found for user", req.token.username);
            res.status(404).json({ success: false, error: "Action not found" });
            return;
        }
        if (result.ownerId != req.token.id) {
            console.log("[Acti] Generic > Trying to delete an action owned by another user from ", req.token.username);
            res.status(403).json({ success: false, error: "This action is not owned by the requesting user" });
            return;
        }
        console.log("[Acti] Generic > Deleting action for user", req.token.username);
        users.deleteOne({ _id: storage.convert_mongo_id(req.body.id) }, {}, (error, result) => {
            if (error || result == null) {
                console.log("[Acti] Generic > Error on action deletion for user", req.token.username);
                res.status(500).json({ success: false, error: "Internal database error" });
                return;
            }
            console.log("[Acti] Generic > Deleted action for user", req.token.username);
            res.status(200).json({ success: true, id: req.body.id });
        });
    });
});

export default routes;