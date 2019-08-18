module.exports = {
    production: {
        db: process.env.MONGODB_URI,
        port: 3001,
        SECRET_TOKEN: process.env.SECRET_TOKEN,
        SECRET_REFRESH_TOKEN: process.env.SECRET_REFRESH_TOKEN
    },
    development: {
        db: process.env.MONGODB_URI,
        port: 3001,
        SECRET_TOKEN: process.env.SECRET_TOKEN,
        SECRET_REFRESH_TOKEN: process.env.SECRET_REFRESH_TOKEN
    }
}