const mysql = require('mysql2');

const db = mysql.createConnection (
    {
        host: 'localhost',
        user: 'root',
        password: 'bluelight',
        database: 'employees',
        multipleStatements: true
    }
);

module.exports = db;