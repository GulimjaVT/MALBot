const config = require("../config.json");
const mysql = require("mysql2/promise");

module.exports = mysql.createConnection({
    user: config.MYSQL.USER,
    password: config.MYSQL.PASS,
    database: config.MYSQL.NAME,
})