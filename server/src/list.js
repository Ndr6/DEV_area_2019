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
};

export default list;