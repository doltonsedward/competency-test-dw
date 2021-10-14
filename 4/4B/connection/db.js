const mysql = require('mysql2')

const connectionPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: null,
    database: 'pulau_db',
    connectionLimit: 5
})

module.exports = connectionPool