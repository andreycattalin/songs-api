const express = require('express')
const api = express.Router()

const song = require('./controllers/song')
const user = require('./controllers/user')
const token = require('./helpers/jwt')

const pass = require('./middlewares/auth')

api.get('/test', pass.authUser, (req, res) => {
    res.send({
        "hora": Date.now(),
        "role": req.user.role
    })
})

/**
 * Songs
 */
api.post('/songs', song.createSong)
api.get('/songs', song.getAllSongs)
api.get('/songs/:id', song.getSongById)
api.patch('/songs/:id', song.updateSong)
api.delete('/songs/:id', song.deleteSong)

/**
 * Auth
 */
api.post('/auth/signup', user.signUp)
api.post('/auth/login', user.logIn)
api.post('/auth/token', token.refreshToken)

api.post('/auth/google', pass.authGoogle, user.loginOrSignUpWithGoogle)

module.exports = {
    api
}