require('dotenv').config()

module.exports = {
    PORT: process.env.PORT || 3000,
    DATABASE: process.env.DB_NAME,
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASS,
}
