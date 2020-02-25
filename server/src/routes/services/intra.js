import { Router } from "express";
import storage from "../../db";

const routes = Router();

routes.post('/connect', (req, res) => {
    if (req.query.token == undefined) {
        res.status(400).json({ success: false, error: "No token given" });
        return;
    }
    if (req.query.token.length != 45 || !req.query.token.startsWith("auth-")) {
        res.status(400).json({ success: false, error: "Invalid Épitech intranet token" });
        return;
    }
    const database = storage.get();
    const users = database.collection("users");
    let cursor = users.find({ _id: req.token.id });
    cursor.count((error, result) => {
        if (error)
            throw error;

        if (result != 1) {
            console.log("[Svce] Intra > Error retrieving user data for", req.token.username);
            res.status(400).json({ success: false, error: "Failure in accounts service. Please email the technical team" });
            return;
        }
        cursor.next(function (error, result) {
            console.log("[Svce] Intra > Connecting user, data below")
            console.log(result);
        });
    });
});


export default routes;

