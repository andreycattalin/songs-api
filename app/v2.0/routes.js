const express = require('express')
const api = express.Router()

api.get('/test', (req, res) => {
    res.send({
        "hola": "mundo",
    })
})

module.exports = {
    api
}