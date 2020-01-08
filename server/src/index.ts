import express from "express";
const port = process.env.PORT || 8080;
const app = express();

app.get('/', (req, res) => {
    res.send('Server working with typescript');
});

app.listen(port, () => {
    console.log('Server listening on port ' + port);
});