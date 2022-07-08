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

router.post("/", async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(404)
      .send("Character information does not fit the basic requeriments");
  }
  try {
    const newCharacter = await Character.create(req.body);
    return res.status(201).send(req.body);
  } catch {
    return res.status(404).send("One element does not meet requiered type");
  }
});

//Exports the Middleware
module.exports = router;
