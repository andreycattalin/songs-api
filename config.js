module.exports = {
    production: {
        db: process.env.MONGODB_URI,
        port: 3001,
        SECRET_TOKEN: process.env.SECRET_TOKEN,
        SECRET_REFRESH_TOKEN: process.env.SECRET_REFRESH_TOKEN,
        googleAuth: {
            clientID: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }
    },
    development: {
        db: process.env.MONGODB_URI,
        port: 3001,
        SECRET_TOKEN: process.env.SECRET_TOKEN,
        SECRET_REFRESH_TOKEN: process.env.SECRET_REFRESH_TOKEN,
        googleAuth: {
            clientID: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }
    }
}