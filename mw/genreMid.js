//Requiere Express to use it as Router inside the Middleware
const { Router } = require("express");
const router = Router();

//Requiere isAuthenticated from server to grant or deny permissions


//Requiere the model that we will use to connect the DB
const { Genre } = require("../db");

//Create methods

//Method GET
router.get("/", async (req, res) => {
  try {
    //If no name, age or media was sent by query ignore info after /
    const genres = await Genre.findAll();
    return genres.length
      ? res.json(genres)
      : res.status(404).send("No media found");
  } catch (error) {
    return res.status(500).json({ error });
  }
});

//Method Post
router.post("/", async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(404)
      .send("Must send name of genre for creation");
  }
  try {
    const newGenre = await Genre.create(req.body);
    return res.status(201).send(req.body);
  } catch {
    return res.status(404).send("Parameter invalid data type");
  }
});

//Exports the Middleware
module.exports = router;
