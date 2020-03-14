import * as express from "express";

const router = express.Router();

router.get('/about.json', (req, res) => {
    res.status(200).json({
        client: {
            host: req.ip
        },
        server: {
            current_time: Date.now(),
            services: [
                {
                    name: 'Intra Epitech',
                    actions: [
                        {
                            name: 'note',
                            description: 'Trigger when a note is submited on your intra account',
                        },
                        {
                            name: 'projectendtime',
                            description: 'Trigger when a project will end soon'
                        }
                    ],
                    reactions: []
                },
                {
                    name: 'Google',
                    actions: [],
                    reactions: []
                },
                {
                    name: 'Twitter',
                    actions: [],
                    reactions: []
                },
                {
                    name: 'Discord',
                    actions: [],
                    reactions: [
                        {
                            name: 'discord',
                            description: 'Send a message to the corresponding webhook'
                        }
                    ],
                },
                {
                    name: 'External API',
                    actions: [],
                    reactions: [
                        {
                            name: 'discord',
                            description: 'Send a message to the corresponding webhook'
                        }
                    ],
                },
                {
                    name: 'SMTP',
                    actions: [],
                    reactions: [
                        {
                            name: 'sendmail',
                            description: 'Send a mail to the given mail address'
                        }
                    ]
                },
                {
                    name: 'Rss feed',
                    actions: [
                        {
                            name: 'onpost',
                            description: 'Trigger when an element is added to the corresponding flux'
                        }
                    ],
                    reactions: []
                },
                {
                    name: 'ISS Station',
                    actions: [
                        {
                            name: 'iss',
                            description: 'Check if the ISS is above the user given location'
                        }
                    ],
                    reactions: []
                },
                {
                    name: 'PornHub',
                    actions: [
                        {
                            name: 'pornhub',
                            description: 'Check if a video has reached a <viewIdx> more views'
                        }
                    ],
                    reactions: []
                },
                {
                    name: 'Time',
                    actions: [
                        {
                            name: 'timer',
                            description: 'Triggers each day, on the specified time'
                        }
                    ],
                    reactions: []
                },
                {
                    name: 'Debug',
                    actions: [
                        {
                            name: 'trigger',
                            description: 'Always triggers, on every check (~30s)'
                        }
                    ],
                    reactions: [
                        {
                            name: 'log',
                            description: 'Logs the message in the server console'
                        }
                    ]
                }
            ],
        }
    });
    return;
});

export default router;