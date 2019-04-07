var connection = require('./connection.js');

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

    var query = "INSERT INTO user(username, password, email, first_name, last_name, dob, gender, opt_in) VALUES(?,?,?,?,?,?,?,?) ";
    connection.query(query, [user.username, user.password, user.email, user.firstname, user.lastname, user.dob, user.gender,user.opt_in], function(err,results,fields){
        if(err){
            console.log(err);
        }
        if(!err){
            console.log("Successfully added user to db");
            return res.json({status: 200});
        }
        else{
            return res.json({status: 404});
        }    
    })

    
}