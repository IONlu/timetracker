const Frisbee = require('frisbee')
const express = require('express')
const nocache = require('nocache')

const api = new Frisbee({
    baseURI: 'https://redmine.ion.lu',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Redmine-API-Key': process.env.REDMINE_APY_KEY
    }
})

const router = express.Router()
router.use(nocache())

router.get('/time_entries', (req, res) => {
    api.get('/time_entries.json')
        .then(result => res.json(result))
})

module.exports = router
