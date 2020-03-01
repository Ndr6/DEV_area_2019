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
            name: 'intra_note',
            description: 'Triggers when you are graded on a project, can be configured to trigger only on some graders',
            requirements: ["intra"],
            parameters: [
                {
                    name: 'grader',
                    type: 'string', // string|bool|int|json
                    optional: true
                }
            ]
        },
        {
            name: 'intra_end',
            description: 'Triggers when the end of a project is in <daysToScan> days (defaults to 7 days)',
            requirements: ["intra"],
            parameters: [
                {
                    name: 'daysToScan',
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
                },
                {
                    name: 'message',
                    type: 'string', // string|bool|int|json
                    optional: false
                }
            ]
        },
        {
            name: 'pornhub',
            description: 'Check if a pornhub video gained views from last time check',
            requirements: [],
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
                },
                {
                    name: 'lastViewIdx',
                    type: 'int', // string|bool|int|json
                    optional: false
                }
            ]
        },
        {
            name: 'iss',
            description: 'Check if the ISS is above the user given location',
            requirements: [],
            parameters: [
                {
                    name: 'location',
                    type: 'string', // string|bool|int|json
                    optional: false
                }
            ]
        },
        {
            name: 'trigger',
            description: 'Always triggers, on every check (30s)',
            requirements: [],
            parameters: []
        }
    ],
    reactions: [
        {
            name: 'mail',
            description: 'Sends an email to the configured address',
            requirements: [],
            parameters: [
                {
                    name: 'to',
                    type: 'string', // string|bool|int|json
                    optional: false
                },
                {
                    name: 'subject',
                    type: 'string', // string|bool|int|json
                    optional: false
                }
            ]
        }
    ]
};

export default list;