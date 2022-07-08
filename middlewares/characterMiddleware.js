//Requiere Express to use it as Router inside the Middleware
const { Router } = require("express");
const router = Router();
//Requiere the model that we will use to connect the DB
const { Character } = require("../db");

//Create methods
router.get("/", async (req, res) => {
  const allCharacters = await Character.findAll();
  res.json(allCharacters);
});
