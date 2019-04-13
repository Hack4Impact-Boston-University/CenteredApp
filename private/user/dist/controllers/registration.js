const connection = require("./connection.js");

function getRandomInt(max){
    /*
    Round down to the nearest integer of the max, 
    then multiply it with a value between 0 and 1 exclusive provided by Math.random() to get value Y,
    and then the nearest integer rounded down of value Y.
    */
    return Math.floor(Math.random() * Math.floor(max));
}
function getRandomAlphaNumChar(){
    /*
    Return a random alphanumeric character 
    */
    const alphanumeric = "abcdefghijklmnopqrstuvwxyz0123456789";
    const index = getRandomInt(36);
    return alphanumeric[index];
}


function generateRegCode(){
    var regCode = "";
    for(var i=0; i<10; i++){
        var randomChar = getRandomAlphaNumChar();
        regCode = regCode + randomChar;
    }
    return regCode;
}

module.exports.processRegCode = function(req,res){
    /*
    Generate a registration code and create an entry in the database
    We have to verify that the database does not already have that registration code listed
    TODO Enter a while loop; until we get a new unique code, keep generating codes. This is unlikely to happen, it is just a safety measure.
    Then save the code to the database, along with the user email and expired set to false.
    */
    var userEmail = req.body.userEmail;
    var regCode = generateRegCode();
    var insertRegCodeQuery = "INSERT INTO regcode(code,expired,user_email) VALUES(?,?,?);";
    connection.query(insertRegCodeQuery, [regCode,0,userEmail], function(err,result){
            if(err){
                console.log(err);
                res.json({
                    status: "Error"
                })
            }
            else{
                console.log("Successfully inserted new reg code for " + userEmail);
                res.json({
                    status: "Successfully inserted registration code",
                    code: regCode
                });
            }
        })
    /*
    TODO: Email registration code to user email 
    */
};

