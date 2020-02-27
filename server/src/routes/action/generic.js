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

routes.patch("/action/link", (req, res) => {
    if (req.body === undefined) {
        res.status(400).json({ success: false, error: "No json settings given" });
        return;
    }
    if (req.body.actionId == undefined || req.body.reactionId == undefined) {
        res.status(400).json({ success: false, error: "Missing action or reaction id parameter" });
        return;
    }

    const database = storage.get();
    const actions = database.collection("actions");
    const reactions = database.collection("reactions");

    reactions.findOne({ _id: storage.convert_mongo_id(req.body.reactionId) }, {}, (error, result) => {
        if (error || result == null) {
            console.log("[Acti] Link > Reaction not found for user", req.token.username);
            res.status(404).json({ success: false, error: "Reaction not found" });
            return;
        }
        if (result.ownerId != req.token.id) {
            console.log("[Acti] Generic > Trying to link a reaction owned by another user from ", req.token.username);
            res.status(403).json({ success: false, error: "This reaction is not owned by the requesting user" });
            return;
        }
        actions.findOne({ _id: storage.convert_mongo_id(req.body.actionId) }, {}, (error, result) => {
            if (error || result == null) {
                console.log("[Acti] Link > Action not found for user", req.token.username);
                res.status(404).json({ success: false, error: "Action not found" });
                return;
            }
            actions.updateOne({ _id: storage.convert_mongo_id(req.body.actionId) },
            { $addToSet: { "linkedRea": req.body.reactionId } },
            {}, function (error, result) {
                if (error) {
                    console.log("[Acti] Link > DB error on action linking for user", req.token.username, ". Error below");
                    console.log(error);
                    res.status(500).json({ success: false, error: "Failure in database service. Please email the technical team" });
                    return;
                }
                console.log("[Acti] Link > Linked action", req.body.actionId, "to reaction", req.body.reactionId, "for user", req.token.username)
                res.status(200).json({ success: true });
                return;
            });
        });
    });
});

export default routes;