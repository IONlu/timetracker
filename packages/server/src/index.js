require('dotenv').config()

const express = require('express')
const api = require('./api.js')

const app = express()
const port = process.env.SERVER_PORT

app.use('/api', api)
app.use(express.static(__dirname + '/../node_modules/@ionlu/timetracker-client/dist'))

app.listen(port, () => console.log(`Server is listening on port ${port}!`))
