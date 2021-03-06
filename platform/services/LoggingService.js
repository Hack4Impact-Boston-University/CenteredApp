/*

We want to be able to tell where errors, debug statements, and other information are coming from.
Each log message should have the name of the controller or service it originated from, 
the function name or action, and then the message itself

*/

class Logger {

    constructor(module) {
        this.module = module;        
    };

    log(type,action,message) {
        var msgOutput;
        if(type == "E"){
            msgOutput = "ERROR | ";
        } else if (type == "I") {
            msgOutput = "INFO | ";
        } else {
            msgOutput = "DEBUG | ";
        }
        msgOutput += this.module + " | action: " + action + " | message: " + message;
        console.log(msgOutput);
        return msgOutput;
    }

    error(action, message) {
        this.log("E", action, message);
    }

    info(action, message) {
        this.log("I", action, message);
    }

    debug(action, message) {
        this.log("D", action, message);
    }
}

module.exports = Logger;