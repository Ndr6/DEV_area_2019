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

routes.get('/list', (req, res) => {
    let list = {
        success: true,
        services: [
            {
                name: 'Intra Epitech',
                description: 'The Epitech intranet, used by Épitech students to access courses and grades',
                parameters: [
                    {
                        name: 'token',
                        type: 'string',
                    }
                ],
                actions: [
                    //Ici rajouter les actions au format suivant :
                    {
                        name: 'name',
                        description: 'description',
                        parameters: [
                            {
                                name: 'name',
                                type: 'type' // string|bool|int|json
                                //pk pas rajouter une regex de validation ici !
                            }
                        ]
                    }
                ],
                reactions: [
                    //Pareil ici
                ]
            },
            {
                name: 'Google',
                description: 'Google account, might be used to get calendar, contact, or mail information',
                parameters: [
                    {
                        name: 'token',
                        type: 'string',
                    }
                ]
            },
            {
                name: 'Twitter',
                description: 'Twitter account, might be used to get tweets, or to tweet',
                parameters: [
                    {
                        name: 'token',
                        type: 'string',
                    }
                ]
            }
        ]
    }
    res.status(200).json(list);
    return;
});

export default routes;