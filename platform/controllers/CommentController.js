var express = require('express');
var connection = require('../db');
var router = express.Router({mergeParams: true});


//TODO: Correct the route urls for the following urls.s
router.post('/', isLoggedIn, function(req, res, next) {
    var putInfo = {
        content: req.body.comment,
        username: req.body.username,
        postID: req.params.postID
    };
    connection.query("INSERT INTO comment SET ?", putInfo, function(err, result){
        if (err) throw err;
        console.log('Last insert ID:', result.insertId);
        res.sendStatus(201);
    });
});


//update comment
router.put('/:commentID', checkCommentOwner, function(req, res, next) {
    var updateq = "UPDATE comment SET content = ? WHERE id = ?;";
    connection.query(updateq, [req.body.comment, req.params.commentID], function(err, result){
        if (err) throw err;
        console.log(`Changed ${result.changedRows} row(s)`);
        res.sendStatus(201);
    });
});


//update likes
router.put('/:commentID/likes', isLoggedIn, function(req, res, next) {
    var updateq = "UPDATE comment SET likes = ? WHERE id = ?;";
    connection.query(updateq, [req.body.numlikes, req.params.commentID], function(err, result){
        if (err) throw err;
        console.log(`Changed ${result.changedRows} row(s)`);
        res.sendStatus(201);
    });
});

router.delete('/:commentID', checkCommentOwner, function(req, res, next) {
    var q = "DELETE FROM comment WHERE id = ?;";
    connection.query(q, req.params.commentID, function(err, result){
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

function checkCommentOwner(req, res, next) {
    if(req.isAuthenticated()) {
        connection.query("SELECT username FROM comment WHERE commentID = ?", req.params.commentID, function(err, result){
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
