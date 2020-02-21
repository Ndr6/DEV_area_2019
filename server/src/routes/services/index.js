import { Router } from "express";

import discordWebhook from "reaction/discordWebhook";
import checkFeed from 'action/rssFeed';
import sendMail from "reaction/sendMail";
import noteIntra from "action/note";
import projectEndIntra from "action/projectEndTime";


const routes = Router();

// Authentication middleware
routes.use('/services', (req, res, next) => {
    //TODO: Restrict the CORS header
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if (!req.headers.authorization)
        return res.status(403).json({ success: false, error: 'API - Missing token' });
    if (!req.headers.authorization.startsWith("Bearer "))
        return res.status(403).json({ success: false, error: 'API - Invalid token' });
    var token = req.headers.authorization.slice(7);
    if (verifyToken(token) == false)
        return res.status(403).json({ success: false, error: 'API - Invalid token' });
    next();
});

// Authenticated services
// Actions
routes.use('/services/rss', checkFeed);
routes.use('/services/intra/note', noteIntra);
routes.use('/services/intra/project_end', projectEndIntra);

// Reactions
routes.use('/services/discord', discordWebhook);
routes.use('/services/action/mail', sendMail);

export default routes;