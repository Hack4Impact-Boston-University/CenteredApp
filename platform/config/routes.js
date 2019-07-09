var app = require("app.js");
const user = require("./controllers/user.js");
const registration = require("../controllers/RegistrationController.js/index.js");


app.get("/", function(req,res){
    res.send("It works");
} )
app.post("/api/user/create", user.createUser);

app.post("/api/user/login", user.login);

app.post("/api/admin/invite", registration.processRegCode);