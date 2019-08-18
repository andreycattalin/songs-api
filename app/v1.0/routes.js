const express = require('express')
const api = express.Router()

const song = require('./controllers/song')
const user = require('./controllers/user')

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

api.post('/auth/signup', user.signUp)
api.post('/auth/login', user.logIn)

module.exports = {
    api
}