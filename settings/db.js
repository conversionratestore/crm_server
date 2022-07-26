const mysql = require('mysql2')
const pool = mysql.createPool({
    connectionLimit : 100,
    host: '185.25.117.0',
    user: 'dragonegor',
    password: '0451Ph4163@',
    database: 'crm_crs'
}).promise()

module.exports = pool
