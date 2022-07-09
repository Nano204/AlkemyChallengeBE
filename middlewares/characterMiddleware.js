//Requiere Express to use it as Router inside the Middleware
const { Router } = require("express");
const router = Router();
//Requiere the model that we will use to connect the DB
const { Character, Media, Op } = require("../db");

//Create methods

//Method GET
router.get("/", async (req, res) => {
  try {
    const { name, age, media } = req.query;

    //Start by verifing query by name
    if (name) {
      const character = await Character.findOne({
        include: {
          model: Media,
          attributes: ["title", "mediaType"],
          through: { attributes: [] },
        },
        where: { name: name },
      });
      return character
        ? res.json(character)
        : res.status(404).send("Character not found");
    }

    //If there's no name verify if age is a send by query
    else if (age) {
      const allCharacters = await Character.findAll({
        where: { age },
        attributes: ["name", "image"],
      });
      return allCharacters.length
        ? res.json(allCharacters)
        : res.status(404).send("No characters found");
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
      return allCharacters.length
        ? res.json(allCharacters)
        : res.status(404).send("No characters found");
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

//Method POST
router.post("/", async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).send("Must send name to create a Character");
  }
  try {
    const newCharacter = await Character.create(req.body);
    return res.status(201).json(newCharacter);
  } catch {
    return res.status(400).send("Parameter invalid data type");
  }
});

//Method PUT
router.put("/", async (req, res) => {
  const { name, media } = req.body;
  if (!name) {
    return res
      .status(400)
      .send("Must send name to identify character before updating");
  }
  try {
    const data = Object.keys(req.body);
    const dataValue = Object.values(req.body);
    const character = await Character.findOne({ where: { name } });
    data.map((element, index) => {
      element !== "media" && (character[element] = dataValue[index]);
    });

    if (media) {
      const [newMedia, created] = await Media.findOrCreate({
        where: { title: media },
        defaults: { title: media, mediaType: "Movie" },
      });
      character.addMedia(newMedia);
    }

    character.save().then(
      () => {
        return res.status(201).send(`${name} has been updated`);
      },
      () => {
        return res.status(400).send("Parameter invalid data type");
      }
    );
  } catch {
    return res.status(400).send("Parameter invalid data type");
  }
});

//Method REMOVE
router.delete("/", async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .send("To delete a character you must provide it's name");
  }
  try {
    const character = await Character.findOne({ where: { name } });

    return character
      ? (await Character.destroy({ where: { name } }),
        res.status(200).send(`The character ${name} was delete`))
      : res.status(404).send("Character not found");
  } catch {
    return res.status(500).send("Can not delete the character");
  }
});

//Exports the Middleware
module.exports = router;
