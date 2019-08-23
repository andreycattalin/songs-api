const dotenv = require('dotenv').config()
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const {
    ExtractJwt
} = require('passport-jwt')
const User = require('../models/user')
const config = require('../../../config')[process.env.NODE_ENV]
const GoogleTokenStrategy = require('passport-google-token').Strategy

/**
 * USER
 * Access for role: ROLE_USER
 */
passport.use('user', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.SECRET_TOKEN,
}, async(payload, done) => {
    try {
        const user = await User.findOne({
            _id: payload.id,
            role: "ROLE_USER"
        })

        if (!user) {
            return done(null, false)
        }

        done(null, user)
    } catch (error) {
        done(error, false)
    }
}))

const authUser = passport.authenticate('user', {
    session: false,
})

/**
 * COMPANY
 * Access for role: ROLE_COMPANY
 */
passport.use('company', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.SECRET_TOKEN,
}, async(payload, done) => {
    try {
        const user = await User.findOne({
            _id: payload.id,
            role: "ROLE_COMPANY"
        })

        if (!user) {
            return done(null, false)
        }

        done(null, user)
    } catch (error) {
        done(error, false)
    }
}))

const authCompany = passport.authenticate('company', {
    session: false,
})

passport.use(new GoogleTokenStrategy({
        clientID: config.googleAuth.clientID,
        clientSecret: config.googleAuth.clientSecret
    },
    function(accessToken, refreshToken, profile, done) {
        console.log("Cosas")
        console.log("profile", profile)
        User.upsertGoogleUser(accessToken, refreshToken, profile, function(err, user) {
            return done(err, user);
        });
    }));

const authGoogle = passport.authenticate('google-token', {
    session: false
})

module.exports = {
    authUser,
    authCompany,
    authGoogle
}