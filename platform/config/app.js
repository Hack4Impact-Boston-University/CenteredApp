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

app.get("/success",function(req,res){
    res.send("User logged in successfully");
})

app.get("/failure", function(req,res){
    res.send("User log in fail");
})



/* Authenticated routes */

/*
All authenticated routes need to access middleware function (deserializeUser)
to ensure that user is authorized 
TODO: determine best way to setup middleware function
TODO: add permissions to user ?
*/

const authorizeUser = function(req,res,next){
    const sessionId = req.cookies.session;
    const invalidSession = res.json({status:"Invalid session"}); //TODO: redirect to login 

    console.log("Authenticating");
    if (!sessionId) {
        return invalidSession;
    }

   authenticationService.deserializeUser(sessionId).then(function(username){
       if(!username){
           return invalidSession;
       }
       res.json({status: `Identification successful for ${username}`});
   });
}
/* -------------------- */

app.post("/user/login", authenticationService.login);


app.use(authorizeUser);

app.get("/user/test", function(req,res){
    res.json({status: "Identification succeeded"});
})
app.post("/admin/invite", registrationController.processRegCode);
app.post("/user/create", userController.createUser);
app.post("/post/create", postController.createPost);
