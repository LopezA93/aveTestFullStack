const express = require("express");
const { Router } = express;
const  login  = require("../controllers/login");
const loginRoute = Router();

loginRoute.post("/", login);

module.exports = loginRoute;
