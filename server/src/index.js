import express from "express";

var port = 3000;
if (process.env.PORT)
    port = process.env.PORT;

const app = express();

app.get('/', (req, res) => res.send('Hello Area server!'));
app.listen(port, () => console.log(`Area server listening on port ${port}!`));