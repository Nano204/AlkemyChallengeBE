//Requiere Express to use it as Router inside the Middleware
const { Router } = require("express");
const router = Router();
//Requiere the model that we will use to connect the DB
const { Character, Media, Op } = require("../db");

//Create methods

//Method Get
router.get("/", async (req, res) => {
  try {
    const { name, age, media } = req.query;

    //Start by verifing query by name
    if (name) {
      const character = await Character.findOne({ where: { name: name } });
      return res.json(character);
    }

    //If there's no name verify if age is a send by query
    else if (age) {
      const allCharacters = await Character.findAll({
        where: { age: { [Op.eq]: 10 } },
        attributes: ["name", "image"],
      });
      return res.json(allCharacters);
    }

    //If there's no age verify if media is send by query
    else if (media) {
      const allCharacters = await Character.findAll({
        include: {
          model: Media,
          attributes: ["title"],
          where: { title: media },
          through: { attributes: [] },
        },
        attributes: ["image", "name"],
      });
      return res.json(allCharacters);
    }

    //If no name, age or media was sent by query ignore info after /
    const allCharacters = await Character.findAll({
      attributes: ["image", "name"],
    });
    return res.json(allCharacters);
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
