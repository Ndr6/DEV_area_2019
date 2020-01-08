
import express from 'express'

const app = express()

app.get('/', function (req, res) {
    res.send('Hello World! AREA API server')
})

app.listen(process.env.PORT, function () {
    console.log('Example app listening on port 3000!')
})