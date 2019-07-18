const connection = require('../config/connection');


class Database {

    query(query, args){
        return new Promise(function(resolve,reject){
            connection.query(query,args,function(error,results){
                if(error){
                    console.log(error);
                    reject();
                    return;
                }
                resolve(results[0]);
                return;
            })
        })

    }

    //TODO: Create insert/add function
}


module.exports = Database;