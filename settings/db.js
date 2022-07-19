const mysql = require('mysql2')
const connection = mysql.createConnection({
    host: '185.25.117.0',
    user: 'dragonegor',
    password: '0451Ph4163@',
    database: 'crm_crs'
}).promise()

module.exports = connection
