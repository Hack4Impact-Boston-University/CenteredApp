//Initialize connection
var mysql = require('mysql');

connection = mysql.createConnection({
    host: 'centered-db.ceni7m6kai0v.us-east-2.rds.amazonaws.com',
    port: '3306',
    user: 'mdesilva',
    password: 'hack4impact',
    database: 'centered'
});

connection.connect(function(err){
    if(err){
        console.error("Error connecting: " + err.stack)
    }
    else{
        console.log("Connected successfully");
    }
});

module.exports = connection;