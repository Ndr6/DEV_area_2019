import express from 'express';
import bodyParser from 'express';
import db from './db';
import routes from './routes'
import cors from 'cors';
import service_list from './list';
import checkSystem from "./checker";
import aboutroute from "./about";

// Constants
const PORT = process.env.PORT || 8080;
const HOST = "0.0.0.0";

const back_version = 0.1;
const api_version = 0;

const app = express();

// DB Connection
db.init();

// Middlewares

// Allow cross origin request
app.use(cors());

app.use((req, res, next) => {
    //TODO: Restrict the CORS access
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(aboutroute);
app.use(routes);

// Routes
app.get('/', (req, res) => {
    res.status(200).send('<h1>Area back-end.</h1>\nIf you see this you went the wrong way\n');
});

app.get('/list', (req, res) => {
    res.status(200).json(service_list);
    return;
});

app.get('/about', (req, res) => {
    res.status(200).json({
        description: "Area back-end",
        authors: "Sébastien Bernard and Hugo Bouleux",
        version: back_version,
        api_version: api_version
    });
});

// Start the action checker in 20 seconds
setTimeout(checkSystem, 20000);

app.listen(PORT, HOST);
console.log(`[Serv] Init > Running on http://${HOST}:${PORT}`);
