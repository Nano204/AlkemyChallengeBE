//Install jest supertest with npm i -D jest supertest (Use -D to get it into devDependencies on package.json)
//Supertest will enable us to test http requests
//Add the "test" method at the scripts of package.json using: "test": "jest --verbose --detectOpenHandles"
//You can remove the "--detectOpenHandles" if you don't want to be announced when jest find a posible open handle on the testing code

//Requiere supertest
const request = require("supertest");
//Connect the server by require the index.js
const app = require("../server.js");
//Require the db and the models that we will test
const { db, Character, Genre, Media } = require("../db");

describe("Routes Testing - Method POST", () => {
  //First we call the beforeAll method to clean the DB before testing adding a force sync
  beforeAll(async () => {
    await db.sync({ force: true });
  });

  //I wont' comment every test because it has it's own description in it's string
  //I'll create a describe for every model and a new sub-describe for grouping methods in each model
  describe("Characters routes - /characters", () => {
    let characterOne;
    beforeEach(() => {
      characterOne = {
        image: "./img/Mickey_Mouse.jpeg",
        name: "Mickey Mouse",
        age: 93,
        weight: 13,
        history:
          "This is the main character of Disney, he is the biggest inspiration of Walt.",
      };
    });

    it("should return an error if at least one of the mandatory parameters is not send", async () => {
      const res = await request(app).post("/characters");
      expect(res.statusCode).toBe(400);
      expect(res.text).toBe("Must send name to create a Character");
    });

    it("should return error if the character creation fails because of a data type", async () => {
      characterOne.age = "NOVENTA";
      const res = await request(app).post("/characters").send(characterOne);
      expect(res.statusCode).toBe(400);
      expect(res.text).toBe("Parameter invalid data type");
    });

    it("should return character object if the character was succesfully created", async () => {
      const res = await request(app).post("/characters").send(characterOne);
      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual(expect.objectContaining(characterOne));
    });
  });

  describe("Medias routes - /media", () => {
    let mediaOne;
    beforeEach(() => {
      mediaOne = {
        image: "./img/Mickey_Mouse_TheOrigins.jpeg",
        title: "Mickey Mouse: The Origins",
        creation_date: "2019-03-21",
        rate: 5,
        mediaType: "Movie",
        genre: "Comedy",
      };
    });

    it("should return an error if at least one of the mandatory parameters is not send", async () => {
      const res = await request(app).post("/media");
      expect(res.statusCode).toBe(404);
      expect(res.text).toBe(
        "Parameters { title, mediaType, genre } must been send to create media"
      );
    });

    it("should return error if the media creation fails because of a data type", async () => {
      mediaOne.mediaType = "Short film";
      const res = await request(app).post("/media").send(mediaOne);
      expect(res.statusCode).toBe(404);
      expect(res.text).toBe("Parameter invalid data type");
    });

    it("should return media object if the media was succesfully created", async () => {
      const res = await request(app).post("/media").send(mediaOne);
      expect(res.statusCode).toBe(201);
      expect(res.body.title).toEqual(mediaOne.title);
    });
  });

  describe("Genres routes - /genres", () => {
    it("should return an error if at least one of the mandatory parameters is not send", async () => {
      const res = await request(app).post("/genres");
      expect(res.statusCode).toBe(404);
      expect(res.text).toBe("Must send name of genre for creation");
    });

    it("should return error if the genre creation fails because of a data type", async () => {
      const res = await request(app)
        .post("/genres")
        .send({
          image: { element: true },
          name: "Comedy",
        });
      expect(res.statusCode).toBe(404);
      expect(res.text).toBe("Parameter invalid data type");
    });

    it("should return genre object if the genre was succesfully created", async () => {
      const res = await request(app).post("/genres").send({
        image: "./img/Christmas.jpeg",
        name: "Christmas",
      });
      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual(
        expect.objectContaining({
          image: "./img/Christmas.jpeg",
          name: "Christmas",
        })
      );
    });
  });

  //Close de DB and force sync to clear it
  afterAll(async () => {
    await db.sync({ force: true });
    db.close();
  });
});
