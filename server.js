//Require express for using the server
const express = require("express");
const server = express();

//Require Morgan to able tu use command next() and have cleaner codes
// //To install morgan use npm i --save morgan
const morgan = require("morgan");
server.use(morgan("dev")); //This is a miiddleware tha will be used in all directions befores they get their final destiny

//We will use authentication by cookies, so we will use cookie-parser to parse the data of the cookies inside the HTTP header
//Cookie parser will allow us to ask for the information at req.cookies
//To install cookie-parser we use npm install --save cookie-parser
const cookieparser = require("cookie-parser");
server.use(cookieparser()); //This is a miiddleware tha will be used in all directions befores they get their final destiny

//Also we well have to use another middleware native from express
//This middleware is urlencode that will help us to parse the information from header to body
//It is specially usefull when conecting to frontend
server.use(express.urlencoded({ extended: true }));

//Require middlewares
const authenticationMid = require("./middlewares/authentication.js");
const characterMid = require("./middlewares/characterMid.js");
const mediaMid = require("./middlewares/mediaMid.js");
const genreMid = require("./middlewares/genreMid.js");

//The first middleware we have to call is express.json() so we can be able to work with JSON format on POST and PUT methods
server.use(express.json());
//The second middleware we have to call is the authendication one, so it can probide the authentication to the user before it get to methods
//We will alse need to create some validation middleware to use them to authorize the user
server.use("/", authenticationMid);
//Call middlewares
server.use("/characters", characterMid);
server.use("/media", mediaMid);
server.use("/genres", genreMid);

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
