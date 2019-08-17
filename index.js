const dotenv = require('dotenv').config()

const mongoose = require('mongoose')
const app = require('./app')
const fs = require('fs')
const https = require('https')

let config = require('./config')
const environment = process.env.NODE_ENV
config = config[environment]

mongoose.Promise = global.Promise
mongoose.connect(config.db, { useNewUrlParser: true }).then(() => {
        console.log('Conexión a la base de datos establecida...')

        app.listen(config.port, () => {
            console.log(`API Rest arrancada: http://localhost:${config.port}`)
        })
    },
    err => {
        console.log(`Error al conectar a la base de datos: ${err}`)
    }
).catch(function(err) {
    console.log(`Error de otro tipo: ${err}`)
});