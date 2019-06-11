var express = require('express');
var connection = require('../db');
var router = express.Router();

router.post('/', isLoggedIn, function(req, res, next) {
    var putInfo = {
        title: req.body.title,
        body: req.body.body,
        username: req.body.username,
        attachments: req.body.attachments
    };
    connection.query("INSERT INTO post SET ?", putInfo, function(err, result){
        if (err) throw err;
        console.log('Last insert ID:', result.insertId);
        res.sendStatus(201);
    });
});

router.get('/', function(req, res, next) {
    var allq = "SELECT * FROM post ORDER BY createdAt Desc;";
    connection.query(allq, function(err, results){
        if (err) throw err;
        console.log(results[0]);
        res.json({posts: results});
    });
});

// Return everything of a single post
router.get('/:postID', function(req, res, next) {
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

});
//update likes
router.put('/:postID', checkPostOwner, function(req, res, next) {
    var updateq = "UPDATE post SET title = ?, body = ?, attachments = ? WHERE id = ?;";
    connection.query(updateq, [req.body.title, req.body.body, req.body.attachments, req.params.postID], function(err, result){
        if (err) throw err;
        console.log(`Changed ${result.changedRows} row(s)`);
        res.sendStatus(201);
    });
});

//update likes
router.put('/:postID/likes', isLoggedIn, function(req, res, next) {
    var updateq = "UPDATE post SET likes = ? WHERE id = ?;";
    connection.query(updateq, [req.body.numlikes, req.params.postID], function(err, result){
        if (err) throw err;
        console.log(`Changed ${result.changedRows} row(s)`);
        res.sendStatus(201);
    });
});

router.delete('/:postID', checkPostOwner, function(req, res, next) {
    var commentq = "DELETE FROM comment WHERE postID = ?;";
    connection.query(commentq, req.params.postID, function(err, result){
        if (err) throw err;
    });
    var allq = "DELETE FROM post WHERE id = ?;";
    connection.query(allq, req.params.postID, function(err, result){
        if (err) throw err;
        console.log(`Deleted ${result.affectedRows} row(s)`);
        res.sendStatus(200);
    });
});

function isLoggedIn (req, res, next){
    if (req.isAuthenticated()) {
        return next();
    }
    res.sendStatus(401);
}

function checkPostOwner(req, res, next) {
    if(req.isAuthenticated()) {
        connection.query("SELECT username FROM post WHERE postID = ?", req.params.postID, function(err, result){
            if (err) {
                throw err;
            } else  {
                if (result.equals(req.user.username)) {
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
}

module.exports = router;
