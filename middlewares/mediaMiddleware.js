//Requiere Express to use it as Router inside the Middleware
const { Router } = require("express");
const router = Router();
//Requiere the model that we will use to connect the DB
const { Media, Genre, Character } = require("../db");

//Create methods
//Method GET
router.get("/", async (req, res) => {
  try {
    const { name, genre, order } = req.query;

    //Start by verifing query by name
    if (name) {
      const media = await Media.findOne({
        include: [
          { model: Genre },
          {
            model: Character,
            attributes: ["name"],
            through: { attributes: [] },
          },
        ],
        where: { title: name },
      });
      return media ? res.json(media) : res.status(404).send("Media not found");
    }

    //If there's no name verify if genre is a send by query
    else if (genre) {
      const conditions = {
        include: { model: Genre, where: { id: genre }, attributes: [] },
      };
      order && (conditions.order = [["title", order]]);
      conditions.attributes = ["title", "image", "creation_date"];
      conditions.exclude = ["Genre"];
      const allMedia = await Media.findAll(conditions);
      return allMedia.length
        ? res.json(allMedia)
        : res.status(404).send("No media found");
    }

    //If there's no age verify if order is send by query
    else if (order) {
      const allMedia = await Media.findAll({
        order: [["title", order]],
        attributes: ["image", "title", "creation_date"],
      });
      return allMedia.length
        ? res.json(allMedia)
        : res.status(404).send("No media found");
    }

    //If no name, age or media was sent by query ignore info after /
    const allMedia = await Media.findAll({
      attributes: ["image", "title", "creation_date"],
    });
    return allMedia.length
      ? res.json(allMedia)
      : res.status(404).send("No media found");
  } catch (error) {
    return res.status(500).json({ error });
  }
});

//Method POST
router.post("/", async (req, res) => {
  const { title, mediaType, genre } = req.body;
  if (!(title && mediaType && genre)) {
    return res
      .status(404)
      .send(
        "Parameters { title, mediaType, genre } must been send to create media"
      );
  }
  try {
    const newMedia = await Media.create(req.body);
    const [mediaGenre, created] = await Genre.findOrCreate({
      where: { name: genre },
    });
    await newMedia.setGenre(mediaGenre);
    return res.status(201).json(newMedia);
  } catch {
    return res.status(404).send("Parameter invalid data type");
  }
});

//Method PUT
router.put("/", async (req, res) => {
  const { title, character } = req.body;
  if (!title) {
    return res
      .status(400)
      .send("Must send title to recognize the media before updating");
  }
  try {
    const data = Object.keys(req.body);
    const dataValue = Object.values(req.body);
    const media = await Media.findOne({ where: { title } });
    data.map((element, index) => {
      element !== "character" && (media[element] = dataValue[index]);
    });
    if (character) {
      const [characterMedia, created] = await Character.findOrCreate({
        where: { name: character },
        defaults: { name: character },
      });
      await media.addCharacter(characterMedia);
    }
    media.save().then(
      () => {
        return res.status(201).send(`${title} has been updated`);
      },
      () => {
        return res.status(400).send("Parameter invalid data type");
      }
    );
  } catch {
    return res.status(400).send("Parameter invalid data type");
  }
});

//Method DELETE
router.delete("/", async (req, res) => {
  const { title } = req.body;
  if (!title) return res.send("Must include title to delete media");
  try {
    const media = Media.findOne({ where: { title } });
    return media
      ? (await Media.destroy({ where: { title } }),
        res.status(200).send(`The media ${title} was delete`))
      : res.status(404).send("Media not found");
  } catch {
    return res.status(500).send("Can not delete the media");
  }
});

//Exports the Middleware
module.exports = router;
