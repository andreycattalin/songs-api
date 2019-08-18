const Song = require("../models/song")

function createSong(req, res) {
    Song.create(req.body)
        .then(response => {
            res.status(200).send(response)
        })
        .catch(err => {
            res.status(400).send({ error: err })
        })
}

function updateSong(req, res) {
    Song.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        .then(response => {
            res.status(200).send(response)
        })
        .catch(err => {
            res.status(404).send({ error: err })
        })
}

function getAllSongs(req, res) {
    Song.find()
        .then(response => {
            res.status(200).send({ data: response })
        })
        .catch(err => {
            res.status(400).send({ error: err })
        })
}

function deleteSong(req, res) {
    Song.findById(req.params.id)
        .remove()
        .then(response => {
            res.status(200).send(response)
        })
        .catch(err => {
            res.status(404).send({ error: err })
        })
}

function getSongById(req, res) {
    Song.findById(req.params.id)
        .then(response => {
            res.status(200).send(response)
        })
        .catch(err => {
            res.status(404).send({ error: err })
        })
}

module.exports = {
    createSong,
    updateSong,
    getAllSongs,
    deleteSong,
    getSongById
}