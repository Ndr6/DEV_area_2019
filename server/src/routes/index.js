import { Router } from "express";
import verifyToken from "../jwt";

//Services
import auth from './auth';
import intraService from "./service/intra";
import googleService from "./service/google";
import twitterService from "./service/twitter";

//Actions
import genericAction from "./action/generic";
import rssAction from './action/rssFeed';
//import noteIntra from "action/note";
//import projectEndIntra from "action/projectEndTime";

//Reactions
import genericReaction from "./action/generic";
//import discordWebhook from "reaction/discordWebhook";
//import sendMail from "reaction/sendMail";

const routes = Router();

// Unauthenticated services
routes.use('/auth', auth);

// Authentication middleware
routes.use('/service', (req, res, next) => {
    //TODO: Restrict the CORS header
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if (!req.headers.authorization)
        return res.status(403).json({ success: false, error: 'API - Missing token' });
    if (!req.headers.authorization.startsWith("Bearer "))
        return res.status(403).json({ success: false, error: 'API - Invalid token' });
    var token = req.headers.authorization.slice(7);
    var decoded = verifyToken(token);
    if (decoded === false)
        return res.status(403).json({ success: false, error: 'API - Invalid token' });
    req.token = decoded;
    next();
});
routes.use('/action', (req, res, next) => {
    //TODO: Restrict the CORS header
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if (!req.headers.authorization)
        return res.status(403).json({ success: false, error: 'API - Missing token' });
    if (!req.headers.authorization.startsWith("Bearer "))
        return res.status(403).json({ success: false, error: 'API - Invalid token' });
    var token = req.headers.authorization.slice(7);
    var decoded = verifyToken(token);
    if (decoded === false)
        return res.status(403).json({ success: false, error: 'API - Invalid token' });
    req.token = decoded;
    next();
});
routes.use('/reaction', (req, res, next) => {
    //TODO: Restrict the CORS header
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if (!req.headers.authorization)
        return res.status(403).json({ success: false, error: 'API - Missing token' });
    if (!req.headers.authorization.startsWith("Bearer "))
        return res.status(403).json({ success: false, error: 'API - Invalid token' });
    var token = req.headers.authorization.slice(7);
    var decoded = verifyToken(token);
    if (decoded === false)
        return res.status(403).json({ success: false, error: 'API - Invalid token' });
    req.token = decoded;
    next();
});

// Authenticated services

// Services
routes.use("/service/intra", intraService);
routes.use("/service/google", googleService);
routes.use("/service/twitter", twitterService);

// Actions
routes.use(genericAction);
routes.use('/action/rss', rssAction);
//routes.use('/intra/note', noteIntra);
//routes.use('/intra/project_end', projectEndIntra);

// Reactions
routes.use(genericReaction);
//routes.use('/services/discord', discordWebhook);
//routes.use('/services/action/mail', sendMail);

export default routes;