import storage from "../../db";
import { Router } from "express";
import router from "../auth";
import findService from "../../utils/findService";
import verifyParams from "../../utils/verifyParams";
import findAction from "../../utils/findAction";
import findReaction from "../../utils/findReaction";

const routes = Router();

routes.post('/', (req, res) => {
    let action = req.body.action;
    let reaction = req.body.reaction;

    if (!action || !reaction) {
        res.status(400).json({success: false, error: "Invalid parameters"});
        return;
    }
    if (!findAction(action.name, action.serviceName) || !findReaction(reaction.name, reaction.serviceName)) {
        res.status(400).json({success: false, error: "Invalid action or reaction. Please verify your parameters"});
        return;
    }
    let dbAction = findAction(action.name, action.serviceName);
    let dbReaction = findReaction(reaction.name, reaction.serviceName);
    //TODO: Verifier que le user soit subscribe au service
    let actionParams = action.params;
    let reactionParams = reaction.params;
    if (!verifyParams(dbAction.parameters, actionParams) || !verifyParams(dbReaction.parameters, reactionParams)) {
        res.status(400).json({success: false, error: "Invalid parameter in your action / reaction"});
        return;
    }
    const database = storage.get();
    const users = database.collection("users");
    const link = {action: action, reaction: reaction};
    users.findOne({ _id: storage.convert_mongo_id(req.token.id) }, (err, doc) => {
        let links = [];
        if (doc.link)
            links = [...doc.link, link];
        else
            links.push(link);
        users.updateOne({ _id: storage.convert_mongo_id(req.token.id) },
            { $set: { 'link': links } },
            {}, function (error, result) {
                if (error) {
                    console.log(error);
                    res.status(500).json({ success: false, error: "Failure in database service (" + error + "). Please email the technical team" });
                    return;
                }
            res.status(200).json({ success: true });
        });

    });
});

export default routes;
