module.exports = {
    production: {
        db: process.env.MONGODB_URI,
        port: 3001
    },
    development: {
        db: process.env.MONGODB_URI,
        port: 3001
    }
}