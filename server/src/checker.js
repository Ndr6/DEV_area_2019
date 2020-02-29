import storage from "./db";
import { checkRss } from "./routes/action/rssFeed";

let checkFunctions = {
    "rss": checkRss,
    "timer": checkRss
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

                actionExecutor(action, user);
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

function actionDelete(actionId) {
    const database = storage.get();
    const actions = database.collection("actions");

    users.deleteOne({ _id: storage.convert_mongo_id(actionId) }, {}, (error, result) => {
        if (error || result == null) {
            console.log("[Chkr] Action > Error on action deletion during auto-check");
            return;
        }
        console.log("[Chkr] Action > Deleted action during auto-check");
    });
}

function actionExecutor(action, user) {
    console.log("ALED");
    console.log(action.type);
    if (checkFunctions[action.type] == undefined) {
        console.log("[Chkr] Action > Action", action._id, "is of an unknown type, skipping");
        return;
    }
    let actionReturn = checkFunctions[action.type](action, user);
    if (actionReturn == undefined || actionReturn.success == undefined || actionReturn.params == undefined
    || (actionReturn.success == true && actionReturn.message == undefined)) {
        console.log("[Chkr] Action > Action", action._id, "has catastrophically failed, deleting");
        actionDelete(action._id);
        return;
    }
    // Store the params in the db
    // If not success, return
    // If success, trigger reaction(s)
}
