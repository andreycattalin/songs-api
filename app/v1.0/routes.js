const express = require('express')
const api = express.Router()

api.get('/usuarios', (req, res) => {
    res.send({
        "hola": "mundo",
        "personas": ["anfrey", "sandra"]
    })
})

module.exports = {
    api
}