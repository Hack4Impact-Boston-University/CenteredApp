const connection = require('./connection.js');


function verifyRegCode(code){
    const verifyRegCodeQuery = "SELECT * FROM regcode WHERE code=?";
    connection.query(verifyRegCodeQuery, [code], function(err,results){
        if(err){
            console.log(err)
        }
        else{
            //access results length using results.length
            if(results.length == 1){
                //Code found
                console.log(results[0]);
                console.log(results[0].user_email)
                console.log("That's a real code!");
            }
            else{
                //Code not in databasee
                console.log("Code not found");
            }
        }
    })
};

//verifyRegCode("somecode00");
verifyRegCode("23vkefbkk7");