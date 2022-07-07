//Require express for using the sever
const express = require("express");
const server = express();
//Require middlewares
const characterMiddleware = require("./middlewares/characterMiddleware.js");
const mediaMiddleware = require("./middlewares/mediaMiddleware.js");
const genreMiddleware = require("./middlewares/genreMiddleware.js");
//Require db
const { db } = require("./db");
//Define port for localhosting
const PORT = 3000;

//Call middlewares
server.use(express.json());
server.use("/character", characterMiddleware);
server.use("/media", mediaMiddleware);
server.use("/genre", genreMiddleware);

//Define root calls
//Use this space to create use GET method for testing server connection
//For testing remember to isntall nodemon and create the start script at package.json
//Use npm start adn run the localhost on a web browser
//To install postman on Linux use #sudo snap install postman
server.get("/", (req, res) => {
  res.send("The server is mounted");
});

//Connect sever
//For testing before creating database use the next line
// server.listen(PORT);
//Use the next lines when the db is already created
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  db.sync({ force: true });
});
