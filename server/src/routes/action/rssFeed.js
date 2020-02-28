import { Router } from "express";
import storage from "../../db";
import parser from "rss-parser";

let Parser = new parser();
const routes = Router();

export async function checkRss(param) {
    let isNewPost = false;
    const url = param.url;
    const lastChecked = param.lastChecked;
    const actualDate = Date.now();
    if (!url || !lastChecked)
        return false;
    let feed = await Parser.parseURL(url);
    console.log(feed.title);
    feed.items.forEach(item => {
        const postDate = new Date(item.isoDate);
        console.log(postDate);
        if (postDate > lastChecked)
            isNewPost = true;
    });
    console.log(isNewPost);
    console.log('Lol lol');
};

routes.post('/', (req, res) => {
    if (req.body === undefined) {
        res.status(400).json({ success: false, error: "No json settings given" });
        return;
    }
    if (req.body.url == undefined) {
        res.status(400).json({ success: false, error: "Missing URL parameter" });
        return;
    }
    if (req.body.checkInterval == undefined || req.body.checkInterval < 60)
        req.body.checkInterval = 600;

    let action = {
        actionType: "rss",
        ownerId: req.token.id,
        checkInterval: req.body.checkInterval,
        lastChecked: 0,
        linkedRea: [],
        actionParams: {
            url: req.body.url
        }
    };

    const database = storage.get();
    const users = database.collection("actions");

    console.log("[Acti] RSS > Adding an action for user", req.token.username);
    users.insertOne(action, {}, (error, result) => {
        if (error) {
            res.status(500).json({ success: false, error: "Internal database error" });
            return;
        }
        console.log(result);
        console.log("[Acti] RSS > Added action for user", req.token.username);
        res.status(200).json({ success: true, id: result.insertedId });
        return;
    });
});

export default routes;