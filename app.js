const express = require('express')
const app = express()
const cors = require('cors')
const routerV1 = require('./app/v1.0/routes')
const routerV2 = require('./app/v2.0/routes')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


/**
 * Default page
 */
app.get('/', (req, res) => {
    res.send("Invalid page")
})

/**
 * Routing API V1.0
 */
app.use('/api/v1/', routerV1.api)

/**
 * Routing API V2.0
 */
app.use('/api/v2/', routerV2.api)

module.exports = app