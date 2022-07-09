//Require express for using the server
const express = require("express");
const server = express();
//Require middlewares
const characterMiddleware = require("./middlewares/characterMiddleware.js");
const mediaMiddleware = require("./middlewares/mediaMiddleware.js");
const genreMiddleware = require("./middlewares/genreMiddleware.js");

//Call middlewares
server.use(express.json());
server.use("/characters", characterMiddleware);
server.use("/media", mediaMiddleware);
server.use("/genres", genreMiddleware);

//Define root calls
//Use this space to create use GET method for testing server connection
//For testing remember to install nodemon and create the start script at package.json
//To install nodemos use npm i -D nodemon (Use -D to get it into devDependencies on package.json)
//Use npm start adn run the localhost on a web browser
//To install postman on Linux use #sudo snap install postman
server.get("/", (req, res) => {
  res.send("The server is mounted");
});

//Exports the server
module.exports = server;