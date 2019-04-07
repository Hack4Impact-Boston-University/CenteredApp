const connection = require('./connection.js');
const bcrypt = require('bcrypt');

const saltRounds = 10; //# of times to salt a given password using bcrypt

module.exports.createUser = function(req,res){
    const user = {
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        dob: req.body.dob,
        gender: req.body.gender,
        opt_in: req.body.opt_in
    }

    const query = "INSERT INTO user(username, password, email, first_name, last_name, dob, gender, opt_in) VALUES(?,?,?,?,?,?,?,?) "; //use ? to escape input values

    bcrypt.hash(user.password, saltRounds).then(function(hash){
        //hash the password, and only after hashing the password do we insert the new user into our db
        connection.query(query, [user.username, hash, user.email, user.firstname, user.lastname, user.dob, user.gender,user.opt_in], function(err,results,fields){
            if(err){
                console.log(err);
            }
            if(!err){
                console.log("Successfully added user to db");
                return res.json({status: 200});
            }
            else{
                return res.json({status: 500});
            }    
        })
    })

    
}