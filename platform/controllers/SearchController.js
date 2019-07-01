var express = require('express');
var connection = require('../db');
var router = express.Router();

// Return everything of a single post
router.get('/', function(req, res, next) {
    var str = req.body.searchString;
    var strarr = str.split(" ");
    console.log(strarr);
    var searchq = "SELECT * FROM post WHERE LOWER(post.title) LIKE LOWER('%";
    strarr.forEach(function (word) {
       searchq += word;
       searchq += "%"
    });
    searchq += "') UNION SELECT * FROM post WHERE LOWER(post.body) LIKE LOWER('%";
    strarr.forEach(function (word) {
        searchq += word;
        searchq += "%"
    });
    searchq += "');";
    connection.query(searchq, function(err, results){
        if (err) throw err;
        res.json({searchResult: results});
    });
});

module.exports = router;
