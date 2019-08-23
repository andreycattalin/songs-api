const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const vars = require('../helpers/defaults')
var generator = require('generate-password');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        min: 2,
        required: true
    },
    googleProvider: {
        type: {
            id: String,
        },
        select: false
    },
    email: {
        type: String,
        lowercase: true,
        match: [vars.regexEmail],
        unique: true,
        required: true
    },
    password: {
        type: String,
        minlength: 6,
        match: [vars.regexPassword],
        select: false,
        required: true
    },
    role: {
        type: String,
        enum: ["ROLE_USER",
            "ROLE_COMPANY",
        ],
        required: true
    },
})

const generateHashPassword = (plainPassword) => {
    return bcrypt.hashSync(plainPassword, bcrypt.genSaltSync(10))
}

// Middleware, antes de guardar encriptar la contraseña
UserSchema.pre('save', function(next) {
    try {
        let user = this

        if (!user.isModified('password')) return next();
        user.password = generateHashPassword(user.password)
        next()
    } catch (error) {
        next(error)
    }
})

// Funcion para comprar la contraseña mediante bcrypt
UserSchema.methods.comparePassword = function(candidatePassword, hashPassword, cb) {
    bcrypt.compare(candidatePassword, hashPassword, function(err, isMatch) {
        if (err) {
            return cb(err)
        }
        cb(null, isMatch)
    })
}

// Find Google user or create if not exist
UserSchema.statics.upsertGoogleUser = function(accessToken, refreshToken, profile, cb) {
    var that = this;
    return this.findOne({
        'googleProvider.id': profile.id
    }, function(err, user) {
        // no user was found, lets create a new one
        if (!user) {

            // generar password random
            var password = generator.generate({
                length: 10,
                numbers: true,
                uppercase: true,
                lowercase: true
            });

            var newUser = new that({
                googleProvider: {
                    id: profile.id,
                },
                email: profile.emails[0].value,
                password: password,
                name: profile.name.givenName,
                role: "ROLE_USER"
            });

            newUser.save(function(error, savedUser) {
                if (error) {
                    console.log(error);
                }
                return cb(error, savedUser);
            });
        } else {
            return cb(err, user);
        }
    });
};

module.exports = mongoose.model('user', UserSchema)