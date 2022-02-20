var mysql = require("mysql");
const dbConfig = require("./db.config");

const connection = mysql.createConnection({
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    multipleStatements: true
})

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = connection;