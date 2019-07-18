const uuid = require("uuid/v4");
const bcrypt = require('bcrypt');
const connection = require('../config/connection');
const loggerService = require("./LoggingService");
const databaseService = require("./DatabaseService");

const log = new loggerService("Authentication Service");
const database = new databaseService();

function verifyUser(res, username, password){
    const action = "verify user";
    const query = "SELECT password FROM user WHERE username=?";
    database.query(query,[username]).then(function(results){
        const hashedPasswordBinary = results.password
        const hashedPassword = hashedPasswordBinary.toString('utf8');
        //we store our passwords in our database as binary, 
        //so we have to use the to string method with the utf8 encoding to get it back to its string format
        bcrypt.compare(password, hashedPassword).then(function(verified){
            if (verified) {
                log.info(action, "User validated");
                serializeUser(res, username);
            } else {
                log.error(action, "User provided invalid credentials");
                res.json({status: "Invalid credentials; user would be redirected to login page"});
            }
        })
        }).catch(function(error){
            log.error(action, error);
            res.sendStatus(500);
        })
}

function login(req,res){
    const action = "login";
    const username = req.body.username;
    const password = req.body.password;
    verifyUser(res, username, password)
}

/*
Generate unique session cookie, 
pair it with the user in a sessions table in the database,
return cookie.
*/
function serializeUser(res, username) {
   const action = "serialize user";
   const newSessionId = uuid();
   const expiration = new Date().getTime() + 864000000 // Expiration is the current time + 10 days from the current time
   const insertSessionQuery = "INSERT INTO sessions(username,id,expiration) values(?,?,?)";
   database.query(insertSessionQuery, [username,newSessionId,expiration]).then(function(results){
        res.cookie("sid", newSessionId, { expires: expiration })
        res.json({status: "Cookie was set"});
   }).catch(function(error){
       log.error(action, error);
       res.sendStatus(500);
   })
}

/* 
Upon all requests to access content for authenticated users,
call deserializeUser 

------------------------------------------------------------
Get the user's cookie, 
lookup in the database their username,
verify that their cookie has not expired,
pass their username into the req object
*/

function deserializeUser(sessionId){
    return new Promise(function(resolve, reject){
        console.log("Deserializing");
        const cookieVerificationQuery = "SELECT username, expiration FROM sessions WHERE id=?";
        connection.query(cookieVerificationQuery,[sessionId], function(err,results){
            if (err) {
                console.log(err);
                return err;
            } else {
                if (results[0] == undefined){
                    reject();
                    return;
                }
                const expiration = results[0].expiration;
                const timeNow = new Date().getTime();
                if(timeNow < expiration){
                    resolve(results[0].username);
                    return;
                }
                else{
                    reject();
                    return;
                }
            }
        })
    })
}


/*
Delete the user's cookie from the server, 
and then send headers to delete the cookie 
from the client. 
*/
function logout(sessionId){

}

module.exports = {
    login: login,
    serializeUser: serializeUser,
    deserializeUser: deserializeUser
}