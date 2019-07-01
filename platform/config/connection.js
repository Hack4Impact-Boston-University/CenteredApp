//Initialize connection
var mysql = require('mysql');
const db = require("./db-config.js.js.js")

connection = mysql.createConnection({
    host: db.host,
    port: db.port,
    user: db.user,
    password: db.password,
    database: db.database
});

connection.connect(function(err){
    if(err){
        console.error("Error connecting: " + err.stack)
    }
});

module.exports = connection;