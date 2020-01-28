import express from "express";
import {createConnection} from "typeorm";
import bodyParser from "body-parser";
import userRoute from "./Routes/User";
const port = process.env.PORT || 8080;
const app = express();


app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send('Server working with typescript');
});

app.use('/user', userRoute);

createConnection().then(_ => {
    app.listen(port, () => {
        console.log('Server listening on port ' + port);
    });
});

