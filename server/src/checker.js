import storage from "./db";
import { checkRss } from "./routes/action/rssFeed";

const checkFunctions = {
    "rss": checkRss
}

export default function checkSystem() {
    const database = storage.get();
    const actions = database.collection("actions");
    let actionNb = 0;

    console.log("[Chkr] Starter > Checking actions for all users");

    let cursor = actions.find({}, {});
    cursor.forEach((doc) => {
        actionNb++;
        console.log(doc);
        if (actionChecker(doc) === true) {
            users.findOne({ _id: storage.convert_mongo_id(action.ownerId) }, {}, (error, user) => {
                if (error || user == null) {
                    console.log("[Chkr] Owner > User", action.ownerId, "not found in DB");
                    return undefined;
                }

                actionExecutor(doc, user);
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
    if (action.linkedRea.length == 0) {
        console.log("[Chkr] Action > Skipping action", action._id, "because no reaction is linked to it");
        return false;
    }
    if (Date.now() < action.lastChecked + action.checkInterval) {
        console.log("[Chkr] Action > Skipping action", action._id, "because last check is too recent");
        return false;
    }
    return true;
}

function actionExecutor(action, user) {
    // TODO: Call the check function of the type of the action
}
