import parser from "rss-parser";
let Parser = new parser();

export default async function checkFeed(param)
{
    let isNewPost = false;
    const url = param.url;
    const lastChecked = param.lastChecked;
    const actualDate = Date.now();
    if (!url || !lastChecked)
        return false;
    let feed = await Parser.parseURL(url);
    console.log(feed.title);
    feed.items.forEach(item => {
        const postDate = new Date(item.isoDate);
        console.log(postDate);
        if (postDate > lastChecked)
            isNewPost = true;
    });
    console.log(isNewPost);
    console.log('Lol lol');
};