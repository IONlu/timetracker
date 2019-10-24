require('dotenv').config()

const express = require('express')
const api = require('./api.js')

const app = express()
const port = 3000

app.use('/api', api)
app.use(express.static(__dirname + '/../node_modules/@ionlu/timetracker-client/dist'))

app.listen(port, () => console.log(`Server is listening on port ${port}!`))
