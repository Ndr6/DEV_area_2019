let list = {
    success: true,
    services: [
        {
            name: 'Intra Epitech',
            route: "intra",
            iconRoute: 'https://i.ya-webdesign.com/images/poop-icon-png-10.png',
            description: 'The Epitech intranet, used by Épitech students to access courses and grades',
            parameters: [
                {
                    name: 'token',
                    type: 'string',
                }
            ],
            actions: [
                {
                    name: 'note',
                    title: 'On note posted',
                    description: 'Trigger when a note is submited on your intra account',
		    route: 'intra_note',
                    parameters: [

                    ]
                },
                {
                    name: 'projectendtime',
                    title: 'Project End Time',
                    description: 'Trigger when a project will end soon',
		    route: 'intra_end',
                    parameters: [

                    ]
                }
            ],
            reactions: [

            ]
        },
        {
            name: 'Google',
            route: "google",
            iconRoute: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg',
            description: 'Come on, you know what Google is',
            parameters: [
                {
                    name: 'token',
                    type: 'string',
                }
            ],
            actions: [

            ],
            reactions: [

            ]
        },
        {
            name: 'Twitter',
            route: "twitter",
            iconRoute: 'https://upload.wikimedia.org/wikipedia/fr/c/c8/Twitter_Bird.svg',
            description: 'Come on, you know what Twitter is',
            parameters: [
                {
                    name: 'token',
                    type: 'string',
                }
            ],
            actions: [

            ],
            reactions: [

            ]
        },
        {
            name: 'Discord',
            route: 'discord',
            iconRoute: 'https://static-s.aa-cdn.net/img/ios/985746746/3c4ea685f34faa70159e14b0c889fdd1',
            description: 'Discord is a proprietary freeware VoIP application and digital distribution platform designed for video gaming communities',
            parameters: [

            ],
            actions: [

            ],
            reactions: [
                {
                    title: 'Discord Webhook',
                    name: 'discord',
                    description: 'Send a message to the corresponding webhook',
		    route: 'discord',
                    parameters: [
                        {
                            name: 'url',
                            type: 'string',
                        },
                        {
                            name: 'message',
                            type: 'string',
                        }
                    ]
                }
            ],
        },
        {
            name: 'External API',
            route: 'api',
            iconRoute: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Cloud-API-Logo.svg/1139px-Cloud-API-Logo.svg.png',
            description: 'Allows to call external web hooks, on generic APIs',
            parameters: [

            ],
            actions: [

            ],
            reactions: [
                {
                    title: 'Discord Webhook',
                    name: 'discord',
                    description: 'Send a message to the corresponding webhook',
		    route: 'webhook',
                    parameters: [
                        {
                            name: 'url',
                            type: 'string',
                            optional: false
                        }
                    ]
                }
            ],
        },
        {
            name: 'SMTP',
            route: 'smtp',
            description: 'Simple Mail Transfer Protocol',
            iconRoute: 'https://www.xplornet.com/wp-content/uploads/2018/06/0628windows10.jpg',
            parameters: [

            ],
            actions: [

            ],
            reactions: [
                {
                    title: 'Send mail to',
                    name: 'sendmail',
                    description: 'Send a mail to the given mail address',
		    route: 'mail',
                    parameters: [
                        {
                            name: 'to',
                            type: 'string',
                        },
                        {
                            name: 'subject',
                            type: 'string',
                        }
                    ]
                }
            ]
        },
        {
            name: 'Rss feed',
            route: 'rss',
            description: 'Really Simple Syndication',
            iconRoute: 'https://blog.juansorroche.com/wp-content/uploads/2018/07/63_logoRss.png',
            parameters: [

            ],
            actions: [
                {
                    title: 'On element posted',
                    name: 'onpost',
                    description: 'Trigger when an element is added to the corresponding flux',
		    route: 'rss',
                    parameters: [
                        {
                            name: 'url',
                            type: 'string',
                        }
                    ]
                }
            ],
            reactions: [

            ]
        },
        {
            name: 'ISS Station',
            route: 'iss',
            description: 'International space station',
            iconRoute: 'https://www.laboiteverte.fr/wp-content/uploads/2015/09/nasa-logo-1280x1059.png',
            parameters: [

            ],
            actions: [
                {
                    title: "ISS above a location",
                    name: 'iss',
                    description: 'Check if the ISS is above the user given location',
		    route: 'iss',
                    parameters: [
                        {
                            name: 'location',
                            type: 'string', // string|bool|int|json
                            optional: false
                        }
                    ]
                }
            ],
            reactions: [

            ]
        },
        {
            name: 'PornHub',
            route: 'pornhub',
            description: 'Pornhub is a pornographic video sharing and pornography website',
            iconRoute: 'https://www.logo.wine/a/logo/Pornhub/Pornhub-Logo.wine.svg',
            parameters: [

            ],
            actions: [
                {
                    title: "Video views goal",
                    name: 'pornhub',
                    description: 'Check if a video has reached a <viewIdx> more views',
		    route: 'pornhub',
                    parameters: [
                        {
                            name: 'url',
                            type: 'string', // string|bool|int|json
                            optional: false
                        },
                        {
                            name: 'viewIdx',
                            type: 'int', // string|bool|int|json
                            optional: false
                        }
                    ]
                }
            ],
            reactions: [

            ]
        },
        {
            name: 'Time',
            route: 'time',
            description: 'Time is the indefinite continued progress of existence and events that occur in an apparently irreversible succession from the past, through the present, into the future',
            iconRoute: 'https://www.pngitem.com/pimgs/m/31-312763_time-clock-creative-commons-logo-hd-png-download.png',
            parameters: [

            ],
            actions: [
                {
                    title: "Daily",
                    name: 'timer',
                    description: 'Triggers each day, on the specified time',
		    route: 'timer',
                    parameters: [
                        {
                            name: 'hours',
                            type: 'int', // string|bool|int|json
                            optional: false
                        },
                        {
                            name: 'minutes',
                            type: 'int', // string|bool|int|json
                            optional: false
                        },
			{
				name: 'message',
				type: 'string',
				optional: false
			}
                    ]
                }
            ],
            reactions: [

            ]
        },
        {
            name: 'Debug',
            route: 'debug',
            description: 'Debug service',
            iconRoute: 'https://banner2.cleanpng.com/20180501/aue/kisspng-defragmentation-hard-drives-computer-icons-disk-de-fragmented-5ae7fa342aa997.1659960715251523081748.jpg',
            parameters: [

            ],
            actions: [
                {
                    title: "Always trigger",
                    name: 'trigger',
                    description: 'Always triggers, on every check (~30s)',
		    route: 'trigger',
                    requirements: [],
                    parameters: []
                }
            ],
            reactions: [
                {
                    title: 'Console log',
                    name: 'log',
                    description: 'Logs the message in the server console',
		    route: 'log',
                    parameters: [

                    ]
                }
            ]
        }
    ],
};

export default list;
