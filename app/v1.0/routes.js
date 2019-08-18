const express = require('express')
const api = express.Router()

const song = require('./controllers/song')

api.get('/test', (req, res) => {
    res.send({
        "hora": Date.now(),
    })
})

api.post('/songs', song.createSong)
api.get('/songs', song.getAllSongs)
api.get('/songs/:id', song.getSongById)
api.patch('/songs/:id', song.updateSong)
api.delete('/songs/:id', song.deleteSong)

module.exports = {
    api
}