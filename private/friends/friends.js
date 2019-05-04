/*
This file will contain all the functionality for friends
*/


const database = require("../user/dist/controllers/connection");

//

function requestFriend(req,res){
    /*
    User 1 is requesting to be friends with User 2. 
    
    */
    const requestee = user1;
    const requested = user2;

    const insertQuery = "INSERT INTO friends(requested,requestee,date,status) VALUES(?,?,curdate(),0);";

    database.query(insertQuery, [requestee,requested], function(err,results){


    })
}