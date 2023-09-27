const pg = require('pg')


// const connectionString = 'postgresql://dbuser:secretpassword@database.server.com:3211/mydb'

const db = new pg.Pool({
    connectionString: process.env.DATABASE_URL
})

module.exports = db