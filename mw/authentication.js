//Requiere Express to use it as Router inside the Middleware
const { Router } = require("express");
const router = Router();

//For practical purposes we will use an string to manage users and passwords, but in real case we shoudl use a DB to handle the information
const users = [
  { id: 1, name: "user1", password: "pass1", email: "user1@email.com" },
  { id: 2, name: "user2", password: "pass2", email: "user2@email.com" },
];

//We will use this middleware at first step so we can watch what is happening inside the cookies while we test the code
// router.use((req, res, next) => {
//   console.log(req.cookies);
//   next();
// });

//Create some middleware funtions to validate authentication
const isAuthenticated = (req, res, next) => {
  let useAuthetication;
  useAuthetication = true; //Comment this line to make tests work
  useAuthetication
    ? req.cookies.userId
      ? next()
      : res.status(401).send("Not autheticated user. Please login or register")
    : next();
};

const isNotAuthenticated = (req, res, next) => {
  req.cookies.userId
    ? res.status(200).send("Should be redirect to /home")
    : next();
};

//Settig the maling response for people who register
//Requiere dotenv to be able to use .env variables by the process.env
//To install use npm i --save dotenv
require("dotenv").config();
//Use sendgrid to send mails. To install use npm i --save sendgrid-mail
const mailService = require("@sendgrid/mail");
const mail = require("@sendgrid/mail");
//Connect the API
mailService.setApiKey(process.env.SG_APIKEY);
const sendMail = async (mailContent) => {
  try {
    console.log(mailContent);
    await mailService.send(mailContent);
    console.log(`Message sent succesfully to ${mailContent.to}`);
  } catch (error) {
    console.log(error.code);
  }
};

//Now we can set the methods
//Method for register and create an account
router.post("/register", isNotAuthenticated, (req, res) => {
  //Get email and password from body
  const { name, email, password } = req.body;
  //Validate if name, email and password were sent and there is no user with same email adress
  //If user is not find set user in variable else set variable as null
  const user =
    name &&
    email &&
    password &&
    !users.filter((user) => user.email === email).length
      ? { id: users.length + 1, name, email, password }
      : null;
  //If user was set then push it in the array and show success if don't sent status 401
  user
    ? (users.push(user),
      sendMail({
        to: email,
        from: process.env.EMAIL,
        subject: "Cuenta registrada",
        text: "Gracias por sumarse a nuestra aplicacion. Puede usar los endpoints libremente",
      }),
      res.send(`User ${user.name} was successfully registered`))
    : res.status(401).send("Invalid data for register");
});

//Method for login if already have an account
router.post("/login", isNotAuthenticated, (req, res) => {
  //Get email and password from body
  const { email, password } = req.body;
  //Validate if email and password were sent and set the user
  //If user is find on the array set it as user else user is false
  const user =
    email &&
    password &&
    users.find((user) => user.email === email && user.password === password);
  //If user exist then set cookies with userId else send  status 401
  return user
    ? (res.cookie("userId", user.id),
      res.send(`User ${user.name} has been authenticated`))
    : res.status(401).send(`Email or password are invalid credentials`);
});

//Method for logout just clear the cookies we set at login
router.post("/logout", isAuthenticated, (req, res) => {
  res.clearCookie("userId");
  res.send(`Bye bye`);
});

//Exports the Middleware
module.exports = { router, isAuthenticated };
