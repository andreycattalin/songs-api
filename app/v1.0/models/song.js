const mongoose = require('mongoose')

var SongSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    autor: {
        type: String,
        required: true
    },
    video: {
        type: String,
        required: true
    },
    createdAt: Number,
})

module.exports = mongoose.model('song', SongSchema)