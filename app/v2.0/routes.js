const express = require('express')
const api = express.Router()

api.get('/usuarios', (req, res) => {
    res.send({
        "adios": "mundo",
    })
})

module.exports = {
    api
}