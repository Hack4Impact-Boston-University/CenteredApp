const uuid = require("uuid/v4");
const bcrypt = require('bcrypt');
const connection = require('../config/connection');

function verifyUser(username,password){
    const query = "SELECT password FROM user WHERE username=?";
    connection.query(query, [username], function(err,results,fields){
        if(err){
            console.log(err);
        }
        else{
            const hashedPasswordBinary = results[0].password
            const hashedPassword = hashedPasswordBinary.toString('utf8');
            //we store our passwords in our database as binary, 
            //so we have to use the to string method with the utf8 encoding to get it back to its string format
            bcrypt.compare(password, hashedPassword).then(function(verified){
                return verified;
            })
        }
    })
}

function login(req,res){
    const username = req.body.username;
    const password = req.body.password;
    if (verifyUser(username,password)) {
        const sessionInformation = serializeUser(username);
        res.cookie("sid",sessionInformation[0], {
            expires: sessionInformation[1]
        })
    } else {
        res.send("Invalid credentials")
    }
}

/*
Generate unique session cookie, 
pair it with the user in a sessions table in the database,
return cookie.
*/
function serializeUser(username) {
   const newSessionId = uuid();
   const expiration = new Date().getTime() + 864000000 // Expiration is the current time + 10 days from the current time
   const insertSessionQuery = "INSERT INTO sessions(username,id,expiration) values(?,?,?)";
   connection.query(insertSessionQuery, [username,newSessionId,expiration], function(err,results){
       if(err){
           console.log("Error");
           return err;
       } else{
           console.log("Retrieved user");
           return {id: newSessionId, expiration:expiration};
       }
   })
}


function deserializeUser(){
/* 
Get the user's cookie, 
lookup in the database their username,
pass their username into the req object
*/
}

module.exports = {
    login: login,
    serializeUser: serializeUser
}