import axios from 'axios';

const baseUrl = 'https://discordapp.com/api';

export default async function discordWebhook(params)
{
    const url = params.url;
    const message = params.message;

    axios.get(url)
        .then(r => {
            const webHook = r.data;
            axios.post(baseUrl + `/webhooks/${webHook.id}/${webHook.token}`, {
                content: message,
            }).then(r => console.log(r.data))
        });
}