let list = {
    success: true,
    services: {
        intra: {
            description: "The Épitech intranet, used by Épitech students to access courses and grades",
            version: 1,
            parameters: {
                token: "String - The autologin token, starts with 'auth-' and is 45 characters long"
            }
        },
        google: {
            description: "Google account, might be used to get calendar, contact, or mail information",
            version: 1,
            parameters: {
                token: "String - The OAuth access token, is shorter than 2048 character"
            }
        },
        twitter: {
            description: "Twitter account, might be used to get tweets, or to tweet",
            version: 1,
            parameters: {
                token: "String - The OAuth access token"
            }
        }
    },
    actions: {
        placeholder: {
            description: "This is not a real service, and is only used as an example for this list format",
            version: -1,
            settings: {
                checkInterval: 3600,
                user_configuration: {
                    server: "String - The server to check for banana received",
                    banana_nb: "Int - The minimum number of bananas to receive to trigger reactions",
                    odd_banana: "Bool - Trigger reaction if receiving odd number of bananas"
                }
            }
        }
    },
    reactions: {
        placeholder: {
            description: "This is not a real service, and is only used as an example for this list format",
            version: -1,
            settings: {
                triggerCooldown: 3600,
                user_configuration: {
                    server: "String - The server to reach",
                    bananas: "Int - The number of bananas to send",
                    recipient: "String - Username of the banana recipient"
                }
            }
        }
    }
};

export default list;