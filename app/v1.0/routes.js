const express = require('express')
const api = express.Router()

const song = require('./controllers/song')

api.get('/test', (req, res) => {
    res.send({
        "hora": Date.now(),
    })
})

api.post('/song', song.createSong)

module.exports = {
    api
}