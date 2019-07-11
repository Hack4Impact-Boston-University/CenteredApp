const express = require("express");
const app = express();
const bodyParser = require('body-parser');


const servicesDir = "../services/";
const authenticationService = require(servicesDir + "AuthenticationService");

const controllersDir = "../controllers/";
const userController = require(controllersDir + "UserController.js");
const registrationController = require(controllersDir + "RegistrationController.js");
const postController = require(controllersDir + "PostController.js");


app.listen(3000);
app.use(bodyParser.urlencoded({extended: false}));


app.get("/", function(req,res){
    res.json({message: "The server is online"});
})


/* Temp routes */
app.get("/success",function(req,res){
    res.send("User logged in successfully");
})

app.get("/failure", function(req,res){
    res.send("User log in fail");
})

app.post("/admin/invite", registrationController.processRegCode);

app.post("/user/create", userController.createUser);

app.post("/post/create", postController.createPost);

app.post("/user/login", authenticationService.login);
