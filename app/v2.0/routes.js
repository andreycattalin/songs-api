const express = require('express')
const api = express.Router()

api.get('/test', (req, res) => {
    res.send({
        "hora": Date.now(),
    })
})

module.exports = {
    api
}