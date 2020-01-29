import express from "express";

var port = 3000
if (process.env.PORT)
    port = process.env.PORT;

const app = express();

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))