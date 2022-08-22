const {Client} = require('pg')

const client = new Client({
    host: "localhost",
//    user: "postgres",
    user: "jan",
    port: 5432,
    password: "280558Hm1*pg",
    database: "postgres"
})

module.exports = client