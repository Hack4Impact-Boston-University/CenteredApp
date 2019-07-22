const connection = require('../config/connection');
const databaseService = require('../services/DatabaseService');
const logger = require('../services/LoggingService');

const log = new logger("Post Controller");
const database = new databaseService();

module.exports.createPost = function(req,res){
    if(!req.body.title) {
        res.json({error: "Post must have title"});
        return;
    }
    if(!req.body.body) {
        res.json({error: "Post must have content"});
        return;
    }
    var putInfo = {
        title: req.body.title,
        body: req.body.body,
        username: req.user,
        likes: 0
    };
    connection.query("INSERT INTO post SET ?", putInfo, function(err, result){
        if (err) throw err;
        console.log('Last insert ID:', result.insertId);
        res.sendStatus(201);
    });
}

// TODO: permissions ? Only friends and user himself should be able to access post
// Return everything of a single post
module.exports.getPost = function(req,res){
    let postRet = [];
    let commentRet = [];
    var postq = "SELECT * FROM post WHERE id = ?;";
    connection.query(postq, req.params.postID, function(err, postresult){
        if (err) throw err;
        postRet = postresult;
        // postresult.forEach(function (el) {
        //     postRet.push(el);
        // });
        var commentq = "SELECT * FROM comment WHERE postID = ?;";
        connection.query(commentq, req.params.postID, function(err, comresult){
            if (err) throw err;
            // comresult.forEach(function (el) {
            //     commentRet.push(el);
            // });
            commentRet = comresult;
            res.json({posts: postRet, comments: commentRet});
        });
    });
}

//NOTE: if fields are missing, then those corresponding fields are set to empty fields.
//TODO: determine logic for handling the above case
module.exports.updatePost = function(req, res){
    const action = "updating post"
    if(!req.params.postID){
        res.json({message: "Must provide a post id"});
    }
    log.debug(action, `The post id is ${req.params.postID}`);
    var updateq = "UPDATE post SET title = ?, body = ?, attachments = ? WHERE id = ?;";
    connection.query(updateq, [req.body.title, req.body.body, req.body.attachments, req.params.postID], function(err, result){
        if (err) throw err;
        console.log(`Changed ${result.changedRows} row(s)`);
        res.sendStatus(201);
    });
}


// TODO: determine whether to maintain list of those who liked the post on the server side, so that they cannot like it twice
module.exports.updateLikes = function(req, res) {
    const action = "updating likes";
    const postId = req.params.postID;
    database.query("SELECT likes FROM post WHERE id = ?;", [postId]).then(function(result){
        const newLikesAmount = result.likes + 1;
        database.query("UPDATE post SET likes = ? WHERE id = ?;", [newLikesAmount, postId]).then(function(result){
            log.info(action, "success");
            res.sendStatus(200);
        }).catch(function(error){
            log.error(action, "Failed to update likes");
            res.sendStatus(500);
        })
    }).catch(function(error){
        log.error(action, "Failed to get likes");
        res.sendStatus(500);
    })
}

module.exports.deletePost = function(req, res) {
    const action = "deleting post";
    const postId = req.params.postID;
    database.delete("comment", `id = ${postId}`).then(function(result){
        database.delete("post", `id = ${postId}`).then(function(result){
            log.info(action, "success");
            res.sendStatus(200);
        }).catch(function(error){
            log.error(action, `Error deleting post ${postId}`);
        })
    }).catch(function(error){
        log.error(action, `Error deleting comments with post ${postId}`)
        res.sendStatus(500);
    })
}

module.exports.verifyPostOwner = function(req, res, next) {
    action = "verifying post owner"
    connection.query("SELECT username FROM post WHERE id= ?", [req.params.postID], function(err, result){
        if (err) {
            throw err;
        } else  {
            if (result[0].username == req.user) {
                next();
            } else {
                res.redirect("back"); //TODO: Redirect to appropriate destination
            }
        }
    });
}


// TODO: Determine the role of this function
/*
router.get('/', function(req, res, next) {
    var allq = "SELECT * FROM post ORDER BY createdAt Desc;";
    connection.query(allq, function(err, results){
        if (err) throw err;
        console.log(results[0]);
        res.json({posts: results});
    });
});
*/