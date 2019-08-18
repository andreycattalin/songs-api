const JWT = require('jsonwebtoken')
const moment = require('moment')
const config = require('../../../config')[process.env.NODE_ENV]
const User = require('../models/user')

function createToken(user) {
    let exp_token = moment().add(7, 'days').unix() // current time + 7 day ahead
    return [
        JWT.sign({
            id: user.id,
            sub: user._id,
            role: user.role, // user role
            iat: moment().unix(), // current time
            exp: exp_token,
        }, config.SECRET_TOKEN),
        exp_token
    ]
}

function createRefreshToken(user) {
    return JWT.sign({
        id: user.id,
        sub: user._id,
        role: user.role, // user role
        iat: moment().unix(), // current time
        exp: moment().add(15, 'days').unix(), // current time + 15 days ahead
    }, config.SECRET_REFRESH_TOKEN)
}

function refreshToken(req, res) {
    if (req.body.refresh_token && req.body.grant_type === 'refresh_token') {
        JWT.verify(req.body.refresh_token, config.SECRET_REFRESH_TOKEN, function(err, data) {
            if (err) {
                return res.status(400).send({
                    error: "TokenExpired"
                })
            }

            User.findOne({
                _id: data.sub,
            }, (err, user) => {
                if (err) {
                    return res.status(401).send({
                        error: "TokenExpired"
                    })
                }

                if (user) {
                    let dataToken = createToken(user)
                    res.status(200).send({
                        access_token: dataToken[0],
                        refresh_token: createRefreshToken(user),
                        expires_in: dataToken[1],
                        role: user.role
                    })
                } else {
                    return res.status(401).send({
                        error: "TokenExpired"
                    })
                }

            })
        })
    } else {
        return res.status(400).send({
            error: "BadRequest"
        })
    }
}

module.exports = {
    createToken,
    createRefreshToken,
    refreshToken
}