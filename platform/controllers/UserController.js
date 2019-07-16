const connection = require('../config/connection.js');
const bcrypt = require('bcrypt');

const saltRounds = 10; //# of times to salt a given password using bcrypt

module.exports.createUser = function(req,res){
    /*
    Verify that registration code is legitimate. 
    If so, set that code as expired and link user_email with that tupe, and then insert user into db 
    If not, reject the registration
    */
    const user = {
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        dob: req.body.dob,
        gender: req.body.gender,
        opt_in: req.body.opt_in,
        regcode: req.body.regcode
    }

    
    const verifyRegCodeQuery = "SELECT * FROM regcode WHERE code=?";
    const insertUserQuery = "INSERT INTO user(username, password, email, first_name, last_name, dob, gender, opt_in) VALUES(?,?,?,?,?,?,?,?) "; //use ? to escape input values

    connection.query(verifyRegCodeQuery, [user.regcode], function(err,results){
        if(err){
            console.log(err)
        }
        else{
            //access results length using results.length
            var result = results[0];
            if(results.length == 1 && result.user_email == user.email){
                //Registration code has been verified, now insert the user into the database
                console.log("That's a real code!");
                bcrypt.hash(user.password, saltRounds).then(function(hash){
                    connection.query(insertUserQuery, [user.username, hash, user.email, user.firstname, user.lastname, user.dob, user.gender,user.opt_in], function(err,results,fields){
                        if(err){
                            console.log(err);
                        }
                        if(!err){
                            //User has been inserted into the database, now update the regcode table and set 
                            //this reg code as expired, and link the newly created user's username
                            console.log(results);
                            console.log("Successfully added user to db");
                            const updateRegCodeQuery = "UPDATE regcode SET expired=?, username=? WHERE code=?";
                            connection.query(updateRegCodeQuery, [1,user.username, user.regcode], function(err,results){
                                if(err){
                                    console.log(err);
                                    return res.json({status: 500});
                                }
                                else{
                                    console.log(results);
                                    return res.json({status: 200});
                                }
                            })
                        
                        }
                        else{
                            return res.json({status: 500});
                        }    
                    })
                })
            }
            else{
                //Code not in database, or the user is using the wrong email to sign up
                res.json({status:400, message:"Invalid code or email address"});
            }
        }
    })   
}

module.exports.login = function(req,res){
    const user = {
        username: req.body.username,
        password: req.body.password
    }


}