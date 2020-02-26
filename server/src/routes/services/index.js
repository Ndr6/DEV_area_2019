import { Router } from "express";

//Services
import intraService from "./intra";
import googleService from "./google";
import twitterService from "./twitter";

//Actions
//import checkFeed from 'action/rssFeed';
//import noteIntra from "action/note";
//import projectEndIntra from "action/projectEndTime";

//Reactions
//import discordWebhook from "reaction/discordWebhook";
//import sendMail from "reaction/sendMail";

const routes = Router();

// Authenticated services

// Services
routes.use("/intra", intraService);
routes.use("/google", googleService);
routes.use("/twitter", twitterService);

// Actions
//routes.use('/rss', checkFeed);
//routes.use('/intra/note', noteIntra);
//routes.use('/intra/project_end', projectEndIntra);

// Reactions
//routes.use('/services/discord', discordWebhook);
//routes.use('/services/action/mail', sendMail);

export default routes;