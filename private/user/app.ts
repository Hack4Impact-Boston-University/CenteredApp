import {Express} from "express";
var mysql = require('mysql');


const connection = mysql.createConnection({
    host: 'centered-db.ceni7m6kai0v.us-east-2.rds.amazonaws.com/',
    port: '3306',
    user: 'mdesilva',
    password: 'hack4impact',
    database: 'user'
});

connection.connect();