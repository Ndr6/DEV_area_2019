import storage from "./db";
import { checkRss } from "./routes/action/rssFeed";

// TODO: Add all check and trigger functions here
let checkFunctions = {
    "rss": checkRss,
    "timer": checkRss
};

let triggerFunctions = {
    "discord": checkRss
};

export default function checkSystem() {
    const database = storage.get();
    const actions = database.collection("actions");
    const users = database.collection("users");
    let actionNb = 0;

    console.log("[Chkr] Starter > Checking actions for all users");

    let cursor = actions.find({}, {});
    cursor.forEach((action) => {
        actionNb++;
        console.log(action); // Debug print of all actions
        if (actionChecker(action) === true) {
            users.findOne({ _id: storage.convert_mongo_id(action.ownerId) }, {}, (error, user) => {
                if (error || user == null) {
                    console.log("[Chkr] Owner > User", action.ownerId, "not found in DB");
                    return undefined;
                }

                let actionResult = actionExecutor(action, user);
                if (actionResult == false)
                    return;
                reactionTrigger(action, actionResult.message, user);
            });
        }
    }, (error) => {
        if (error) {
            console.log("[Chkr] Starter > Database error during checking all actions");
            return;
        }
        console.log("[Chkr] Starter > Checked", actionNb, "actions");
    });
}

function actionChecker(action) {
    /*if (action.linkedRea.length == 0) {
        console.log("[Chkr] Action > Skipping action", action._id, "because no reaction is linked to it");
        return false;
    }*/
    if (Date.now() < action.lastChecked + action.checkInterval) {
        console.log("[Chkr] Action > Skipping action", action._id, "because last check is too recent");
        return false;
    }
    return true;
}

function reactionTrigger(action, actionMessage, user) {
    const database = storage.get();
    const reactions = database.collection("reactions");
    let reactionNb = 0;

    action.linkedRea.forEach(reactionId => {
        console.log(action); // Debug print of all actions
        reactions.findOne({ _id: storage.convert_mongo_id(reactionId) }, {}, (error, reaction) => {
            if (error || reaction == null) {
                console.log("[Chkr] Reaction > Reaction", reactionId, "not found in DB");
                //TODO: Remove the reaction from the action linkedRea
                return false;
            }
            reactionNb++;
            reactionExecutor(reaction, user, actionMessage);
        });
    });
}

function reactionExecutor(reaction, user, actionMessage) {
    if (triggerFunctions[reaction.type] == undefined) {
        console.log("[Chkr] Rection > Reaction", reaction._id, "is of an unknown type, skipping");
        return;
    }
    // Run the reaction here
    let reactionReturn = triggerFunctions[reaction.type](reaction, user, actionMessage);

    if (reactionReturn == undefined || reactionReturn.success == undefined || reactionReturn.params == undefined) {
        console.log("[Chkr] Reaction > Reaction", reaction._id, "has catastrophically failed, deleting");
        reactionDelete(reaction._id);
        return;
    }
    updateReactionParams(reaction._id, reaction.params);
    if (reactionReturn.success == false) {
        console.log("[Chkr] Reaction > Reaction", reaction._id, "has failed");
        return;
    }
    console.log("[Chkr] Reaction > Reaction", reaction._id, "successfully triggered");
}

function reactionDelete(reactionId) {
    const database = storage.get();
    const reactions = database.collection("reactions");

    reactions.deleteOne({ _id: storage.convert_mongo_id(reactionId) }, {}, (error, result) => {
        if (error || result == null) {
            console.log("[Chkr] Reaction > Error on reaction deletion after failed trigger");
            return;
        }
        console.log("[Chkr] Reaction > Deleted reaction during auto-check");
    });
}

function actionDelete(actionId) {
    const database = storage.get();
    const actions = database.collection("actions");

    actions.deleteOne({ _id: storage.convert_mongo_id(actionId) }, {}, (error, result) => {
        if (error || result == null) {
            console.log("[Chkr] Action > Error on action deletion during auto-check");
            return;
        }
        console.log("[Chkr] Action > Deleted action during auto-check");
    });
}

function updateReactionParams(reactionId, params) {
    const database = storage.get();
    const reactions = database.collection("reactions");

    reactions.updateOne({ _id: storage.convert_mongo_id(reactionId) }, { $set: { params: params } }, {}, (error, result) => {
        if (error || result == null) {
            console.log("[Chkr] Reaction > Error on reaction parameters updating after trigger");
            return;
        }
        console.log("[Chkr] Reaction > Reaction", actionId, "parameters updated after trigger");
    });
}

function updateActionParams(actionId, params) {
    const database = storage.get();
    const actions = database.collection("actions");

    actions.updateOne({ _id: storage.convert_mongo_id(actionId) }, { $set: { params: params } }, {}, (error, result) => {
        if (error || result == null) {
            console.log("[Chkr] Action > Error on action parameters updating during auto-check");
            return;
        }
        console.log("[Chkr] Action > Action", actionId, "parameters updated during auto-check");
    });
}

function actionExecutor(action, user) {
    if (checkFunctions[action.type] == undefined) {
        console.log("[Chkr] Action > Action", action._id, "is of an unknown type, skipping");
        return false;
    }
    // Run the action here
    let actionReturn = checkFunctions[action.type](action, user);

    if (actionReturn == undefined || actionReturn.success == undefined || actionReturn.params == undefined
    || (actionReturn.success == true && actionReturn.message == undefined)) {
        console.log("[Chkr] Action > Action", action._id, "has catastrophically failed, deleting");
        actionDelete(action._id);
        return false;
    }
    updateActionParams(action._id, action.params);
    if (actionReturn.success == false) {
        console.log("[Chkr] Action > Action", action._id, "has not triggered");
        return false;
    }
    console.log("[Chkr] Action > Triggering reactions for action", action._id);
    return actionReturn;
}
