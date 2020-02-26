import { Router } from "express";
import storage from "../../db";

const routes = Router();

routes.post('/connect', (req, res) => {
    if (req.query.username == undefined || req.query.password == undefined || req.query.host == undefined) {
        res.status(400).json({ success: false, error: "Missing smtp credentials" });
        return;
    }
    if (false) { // TODO: Validation of credential data
        res.status(400).json({ success: false, error: "Invalid Épitech intranet token" });
        return;
    }
    const database = storage.get();
    const users = database.collection("users");
    let cursor = users.find({ _id: storage.convert_mongo_id(req.token.id) });
    cursor.count((error, result) => {
        if (error)
            throw error;

        if (result != 1) {
            console.log("[Svce] SMTP > Error retrieving user data for", req.token.username);
            console.log("[Svce] SMTP > Found", result, "accounts in DB for this user");
            res.status(400).json({ success: false, error: "Failure in accounts service. Please email the technical team" });
            return;
        }
        console.log("[Svce] SMTP > Storing credentials for user", req.token.username)
        users.updateOne({ _id: storage.convert_mongo_id(req.token.id) },
            { $set: { tokens: { smtp: {username: req.query.username, password: req.query.password, host: req.query.host } } } },
            {}, function (error, result) {
                if (error) {
                    console.log("[Svce] SMTP > DB error on credentials storage for user", req.token.username, ". Error below");
                    console.log(error);
                    res.status(500).json({ success: false, error: "Failure in database service. Please email the technical team" });
                    return;
                }
                console.log("[Svce] SMTP > Stored credentials for user", req.token.username)
                res.status(400).json({ success: true });
                return;
        });
    });
});

export default routes;