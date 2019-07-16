/*

We want to be able to tell where errors, debug statements, and other information are coming from.
Each log message should have the name of the controller or service it originated from, 
the function name or action, and then the message itself

*/

class Logger {

    constructor(module){
        this.module = module;        
    };

    log(type,action,message){
        var msgOutput;
        if(type == "E"){
            msgOutput += "ERROR |";
        } else {
            msgOutput += "INFO |";
        }
        msgOutput += this.module + " | action: " + action + " | message: " + message;
        console.log(msgOutput);
        return msgOutput;
    }

    logError(action,message){
        this.log("E", action, message);
    }

    logInfo(action,message){
        this.log("I", action, message);
    }

}

module.exports = Logger;