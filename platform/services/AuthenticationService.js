const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');

module.exports.login = passport.authenticate('local', {
    successRedirect: "/success",
    failureRedirect: "/failure"
});

passport.use(new LocalStrategy(
    function(username,password,done){
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
                    if(verified==true){
                        done(null,username);
                    }
                    else{
                        done(null,false);
                    }
                })
            }
        })
    }
))

