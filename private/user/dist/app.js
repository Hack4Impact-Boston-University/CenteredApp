//"use strict";
//Object.defineProperty(exports, "__esModule", { value: true });

const express = require("express");
const app = express();
const bodyParser = require('body-parser');

const user = require("./controllers/user.js");

app.listen(3000);

app.use(bodyParser.urlencoded({extended: false}));

app.post("/api/user/create", user.createUser);

app.post("/api/user/login", user.login);