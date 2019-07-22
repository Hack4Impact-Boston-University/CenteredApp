const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const servicesDir = "../services/";
const authenticationService = require(servicesDir + "AuthenticationService");

const controllersDir = "../controllers/";
const userController = require(controllersDir + "UserController.js");
const registrationController = require(controllersDir + "RegistrationController.js");
const postController = require(controllersDir + "PostController.js");


app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.listen(3000);



console.log("App is running");

/* Temp routes */
app.get("/", function(req,res){
    res.send("<h1> Server is online </h1>");
})
app.get("/getCookie", function(req,res){
    res.cookie("session", "4009c266-c6ba-437f-ab17-948372e566a7");
    res.json({message: "Cookie sent "});
})

app.get("/readCookie", function(req, res){
    console.log("The cookies are: ");
    console.log(req.cookies);
    res.send(req.cookies.session);
})

/* Unauthenticated routes */

app.post("/user/create", userController.createUser);
app.post("/user/login", authenticationService.login);

/* Temporarily unauthenticated routes. Move to authenticated when initial testing is complete */

app.post("/admin/invite", registrationController.processRegCode);


/* -------------------- */



/* Authentication middleware for authenticated routes */

const authorizeUser = function(req,res,next){
    const sessionId = req.cookies.sid;

   authenticationService.deserializeUser(sessionId).then(function(username){
       req.user = username;
       next();
   }).catch(function(){
       console.log("Identification failed");
       res.json({status: "Invalid session id"});
   });
}

app.use(authorizeUser);

/* Authenticated routes  */

app.get("/user/test", function(req,res){
    res.json({status: `Identification succeeded for ${req.user}`});
})

app.get("/user/logout", authenticationService.logout);

// Posts
app.get("/post/:postID", postController.getPost);
app.post("/post/create", postController.createPost);
app.put("/post/:postID", postController.verifyPostOwner, postController.updatePost);
app.put("/post/:postID/likes", postController.updateLikes);
app.delete("/post/:postID", postController.verifyPostOwner, postController.deletePost);
