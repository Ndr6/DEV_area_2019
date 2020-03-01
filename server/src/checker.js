import storage from "./db";

// Actions
import { checkRss } from "./routes/action/rssFeed";
import { checkIntraEndTime } from "./routes/action/intra_end";
import { checkIntraNote } from "./routes/action/intra_note";
import { checkPornhub } from "./routes/action/pornhub";
import { checkTimer } from "./routes/action/timer";
import { checkIss } from "./routes/action/issSight";

// TODO: Add all check and trigger functions here
let checkFunctions = {
    "rss": checkRss,
    "timer": checkTimer,
    "intra_end": checkIntraEndTime,
    "intra_note": checkIntraNote,
    "pornhub": checkPornhub,
    "iss": checkIss
};

let triggerFunctions = {
    "discord": checkRss
};

let checkNb = 0;

export default function checkSystem() {
    const database = storage.get();
    const actions = database.collection("actions");
    const users = database.collection("users");
    let actionNb = 0;

    console.log("[Chkr] Starter > Checking actions for all users");

    console.log("/----------------------------Check start [", ++checkNb, "]------------------------------\\");

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
        console.log("\\-----------------------------Check end [", checkNb, "]-------------------------------/");
        setTimeout(checkSystem, 30000);
    });
}

function actionChecker(action) {
    /*if (action.linkedRea.length == 0) {
        console.log("[Chkr] Action > Skipping action", action._id, "because no reaction is linked to it");
        return false;
    }*/
    //TODO: Check interval
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

async function reactionExecutor(reaction, user, actionMessage) {
    if (triggerFunctions[reaction.type] == undefined) {
        console.log("[Chkr] Rection > Reaction", reaction._id, "is of an unknown type, skipping");
        return;
    }
    // Run the reaction here
    let reactionReturn = await triggerFunctions[reaction.type](reaction, user, actionMessage);

    if (reactionReturn == undefined || reactionReturn.success == undefined || reactionReturn.params == undefined) {
        console.log("[Chkr] Reaction > Reaction", reaction._id, "has catastrophically failed, deleting");
        reactionDelete(reaction._id);
        return;
    }
    updateReactionParams(reaction._id, reaction.params, reactionReturn.success);
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

function updateReactionParams(reactionId, params, success) {
    const database = storage.get();
    const reactions = database.collection("reactions");

    let update = { $set: { params: params } };
    if (success == true)
        update.$set.lastTriggered = Date.now();

    reactions.updateOne({ _id: storage.convert_mongo_id(reactionId) }, update, {}, (error, result) => {
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

    actions.updateOne({ _id: storage.convert_mongo_id(actionId) }, { $set: { params: params, lastChecked: Date.now() } }, {}, (error, result) => {
        if (error || result == null) {
            console.log("[Chkr] Action > Error on action parameters updating during auto-check");
            return;
        }
        console.log("[Chkr] Action > Action", actionId, "parameters updated during auto-check");
    });
}

async function actionExecutor(action, user) {
    if (checkFunctions[action.type] == undefined) {
        console.log("[Chkr] Action > Action", action._id, "is of an unknown type, skipping");
        return false;
    }

    // Run the action here
    let actionReturn = undefined;
    try {
        actionReturn = await checkFunctions[action.type](action, user);
    } catch (err) {
        console.log("[Chkr] Action > Action", action._id, "threw an exception, deleting");
        console.log(err);
        actionDelete(action._id);
        return false;
    }

    console.log(actionReturn);
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
