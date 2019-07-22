const connection = require('../config/connection');
const loggingService = require("./LoggingService");

const log = new loggingService("Database Service");

class Database {

    query(query, args){
        const action = "Query";
        return new Promise(function(resolve,reject){
            connection.query(query,args,function(error, results){
                if (error) {
                    log.error(action, error);
                    reject();
                    return;
                }
                resolve(results[0]);
                return;
            })
        })

    }

    //TODO: Create insert/add function

    //TODO: safely escape queries
    delete(table, args){
        const action = "delete query"
        const query = `DELETE FROM ${table} WHERE ${args}`;
        log.debug("delete query", query);
        return new Promise(function(resolve, reject){
            connection.query(query, function(error, results){
                if (error) {
                    log.error(error);
                    reject();
                    return;
                }
                resolve();
                return;
            })
        });
    }

}


module.exports = Database;