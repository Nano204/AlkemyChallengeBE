//Requiere Express to use it as Router inside the Middleware
const { Router } = require("express");
const router = Router();
//Requiere the model that we will use to connect the DB
const { Genre } = require("../db");

//Create methods

router.post("/", async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(404)
      .send("Genre information does not fit the basic requeriments");
  }
  try {
    const newGenre = await Genre.create(req.body);
    return res.status(201).send(req.body);
  } catch {
    return res.status(404).send("One element does not meet requiered type");
  }
});

//Exports the Middleware
module.exports = router;
