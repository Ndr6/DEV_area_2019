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