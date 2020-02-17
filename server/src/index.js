import express from 'express';
import bodyParser from 'express';
import discordWebhook from "./reactions/discordWebhook";
import checkFeed from './actions/rssFeed';
import sendMail from "./reactions/sendMail";
import db from './db';
//import routes from './routes'

// Constants
const PORT = (process.env.PORT == undefined ? 36969 : process.env.PORT);
const HOST = "0.0.0.0";

const back_version = 0.1;
const api_version = 0;

const app = express();

// DB Connection
//let storage = new db;
function tryAtMost(maxRetries, promise) {
    promise = promise || new Promise();
    if (/*storage.test_db()*/true) {
        console.log("[Serv] Init > Connected to DB");
        promise.resolve(result);
    } else if (maxRetries > 0) {
        // Try again if we haven't reached maxRetries yet
        console.error("[Serv] Init > Failed to connect to DB, retrying...");
        setTimeout(function () {
            tryAtMost(maxRetries - 1, promise);
        }, 1000);
    } else {
        console.error("[Serv] Init > Failed to connect to DB, too many tries, exiting.");
        process.exit(0);
    }
}

// Middlewares
app.use((req, res, next) => {
    //TODO: Restrict the CORS access
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
//app.use(routes);

// Routes
app.get('/', (req, res) => {
    res.send('<h1>Area back-end.</h1>\nIf you see this you went the wrong way\n');
});

app.get('/about', (req, res) => {
    res.status(200).json({
        description: "Area back-end",
        authors: "Sébastien Bernard and Hugo Bouleux",
        version: back_version,
        api_version: api_version
    });
});

async function main()
{
//    await sendMail("clapota59160@gmail.com", "Bite", "Tu suces une bite");
/*    await checkFeed({
        url: 'https://www.reddit.com/.rss',
        lastChecked: new Date('2021,1,1'),
    });*/
    await discordWebhook({
        url: 'https://discordapp.com/api/webhooks/678973462861185024/RUA-kd4i_clsHuZPJAsOzkzo9-AqRFzTGwT5TwF0Ilw1dfO9Op93mSO9-SdnwjMZhwPS',
        message: 'Bite de noir',
    });
}

main();

app.listen(PORT, HOST);
console.log(`[Serv] Init > Running on http://${HOST}:${PORT}`);