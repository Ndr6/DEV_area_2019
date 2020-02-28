let list = {
    success: true,
    services: [
        {
            name: 'Intra Epitech',
            route: "intra",
            description: 'The Epitech intranet, used by Épitech students to access courses and grades',
            parameters: [
                {
                    name: 'token',
                    type: 'string',
                }
            ]
        },
        {
            name: 'Google',
            route: "google",
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
            route: "twitter",
            description: 'Twitter account, might be used to get tweets, or to tweet',
            parameters: [
                {
                    name: 'token',
                    type: 'string',
                }
            ]
        }
    ],
    actions: [
        {
            name: 'rss',
            description: 'Reads a rss feed and triggers if there is a new post',
            requirements: [],
            parameters: [
                {
                    name: 'url',
                    type: 'string', // string|bool|int|json
                    optional: false
                },
                {
                    name: 'checkInterval',
                    type: 'int', // string|bool|int|json
                    optional: true
                }
            ]
        },
        {
            name: 'timer',
            description: 'Triggers everyday at the chosen time',
            requirements: [],
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
                }
            ]
        }
    ],
    reactions: [
        {
            name: 'discord',
            description: 'Sends a message to a discord channel through a webhook',
            requirements: [],
            parameters: [
                {
                    name: 'url',
                    type: 'string', // string|bool|int|json
                    optional: false
                },
                {
                    name: 'message',
                    type: 'string', // string|bool|int|json
                    optional: false
                }
            ]
        }
    ]
};

export default list;