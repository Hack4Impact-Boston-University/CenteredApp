const database = require("./user/controllers/connection");

//@Todo: Rename file to UserController
//Explore option of using typescript for this project

//DEPRECATED: Switching to object oriented approach
function requestFriend(req,res){
    /*
    User 1 is requesting to be friends with User 2. 
    
    */
    const requestee = user1;
    const requested = user2;

    const insertQuery = "INSERT INTO friends(requested,requestee,date,status) VALUES(?,?,curdate(),0);";

    database.query(insertQuery, [requestee,requested], function(err,results){


    })
}

class User{

    constructor(){};

    /*
    * Get a list of ids of user's friends
    * @param: user id 
    * @return: Array of user's friend's ids 
    */
    getFriends(request:Object){

    }

    /*
    * Request a friend
    * @param: user id of requestee, user id of requested
    * @return: null;
    */
    requestFriend(request: Object){

    }

    /*
    * Confirm friend request
    * @param: user id, user id of confirmed friend
    * @return: null
    */
    confirmFriend(request: Object){

    }

    /*
    * Delete a friend
    * @param: user id, user id of friend to be deleted
    * @return: null
    */
    deleteFriend(request: Object){

    }



}