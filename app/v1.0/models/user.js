const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const vars = require('../helpers/defaults')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        min: 2
    },
    email: {
        type: String,
        lowercase: true,
        match: [vars.regexEmail],
        unique: true
    },
    password: {
        type: String,
        minlength: 6,
        match: [vars.regexPassword],
        select: false
    },
    role: {
        type: String,
        enum: ["ROLE_USER",
            "ROLE_COMPANY",
        ]
    },
})

// Middleware, antes de guardar encriptar la contraseña
UserSchema.pre('save', function(next) {
    try {
        let user = this

        if (!user.isModified('password')) return next();
        user.password = bcryptHelper.generateHashPassword(user.password)
        next()
    } catch (error) {
        next(error)
    }
})

// Funcion para comprar la contraseña mediante bcrypt
UserSchema.methods.comparePassword = function(candidatePassword, hashPassword, cb) {
    bcrypt.compare(candidatePassword, hashPassword, function(err, isMatch) {
        if (err) {
            debug(err)
            return cb(err)
        }
        cb(null, isMatch)
    })
}

module.exports = mongoose.model('user', UserSchema)