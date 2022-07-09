//Requiere Express to use it as Router inside the Middleware
const { Router } = require("express");
const router = Router();
//Requiere the model that we will use to connect the DB
const { Media } = require("../db");

//Create methods

//Method POST
router.post("/", async (req, res) => {
  const { title, mediaType } = req.body;
  if (!(title && mediaType)) {
    return res
      .status(404)
      .send("Media information does not fit the basic requeriments");
  }
  try {
    const newGenre = await Media.create(req.body);
    return res.status(201).send(req.body);
  } catch {
    return res.status(404).send("One element does not meet requiered type");
  }
});

//Exports the Middleware
module.exports = router;
